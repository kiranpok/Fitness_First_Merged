const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../server");
const User = require("../models/userModel");
const { requireAuth } = require("../middleware/authMiddleware");
const { signinUser } = require("../controllers/userController");

const api = supertest(app);

describe("User Controller Tests", () => {
  let authToken;

  beforeEach(async () => {
    // Clear the database and register a user for testing
    await User.deleteMany({});
    const response = await api.post("/api/user/signup").send({
      name: "Test User",
      email: "test@example.com",
      password: "testpassword",
    });
    authToken = response.body.token;
    console.log("Authentication Token in before Each:", authToken);
  });

  afterAll(async () => {
    // Close the MongoDB connection
    await mongoose.connection.close();
  });

  describe("POST /api/user/signup", () => {
    test("should register a new user", async () => {
      const response = await api
        .post("/api/user/signup")
        .send({
          name: "John Doe",
          email: "johndoe@example.com",
          password: "securepassword",
        })
        .expect(201);
      expect(response.body).toHaveProperty("token");
    });

    test("should return 400 if required fields are missing", async () => {
      await api
        .post("/api/user/signup")
        .send({
          name: "Invalid User",
          // Missing email and password
        })
        .expect(400);
    });

    test("should return 404 if email already exists", async () => {
      await api
        .post("/api/user/signup")
        .send({
          name: "Duplicate User",
          email: "test@example.com", // Email that already exists
          password: "password123",
        })
        .expect(404);
    });
  });

  describe("POST /api/user/signin", () => {
    test("should login an existing user", async () => {
      await api
        .post("/api/user/signin")
        .send({
          email: "test@example.com",
          password: "testpassword",
        })
        .expect(200);
    });

    test("should return 404 if email is not found", async () => {
      await api
        .post("/api/user/signin")
        .send({
          email: "nonexistent@example.com",
          password: "password123",
        })
        .expect(404);
    });

    test("should return 401 if password is incorrect", async () => {
      await api
        .post("/api/user/signin")
        .send({
          email: "test@example.com",
          password: "incorrectpassword",
        })
        .expect(401);
    });
  });

  describe("GET /api/user/getUserProfile", () => {
    test("should get user data if authenticated", async () => {
      const response = await api
        .get("/api/user/profile")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty("name", "Test User");
    });

    test("should return 401 if not authenticated", async () => {
      await api.get("/api/user/profile").expect(401);
    });
  });

  describe("PUT /api/user/updateUserProfile", () => {
    test("should update user data if authenticated", async () => {
      const updatedData = {
        name: "Updated User",
      };
      const response = await api
        .put("/api/user/profile")
        .set("Authorization", `Bearer ${authToken}`)
        .send(updatedData)
        .expect(200);
      expect(response.body).toHaveProperty("name", "Updated User");
    });

    test("should return 401 if not authenticated", async () => {
      await api
        .put("/api/user/profile")
        .send({
          name: "Updated User",
        })
        .expect(401);
    });
  });
});

//   describe("DELETE /api/user/profile", () => {
//     test("should delete user if authenticated", async () => {
//       await api
//         .delete("/api/user/profile")
//         //.set("Authorization", `Bearer ${authToken}`)
//         .set("Cookie", `Authorization=${authToken}`)
//         .expect(200);
//       const users = await User.find({});
//       expect(users.length).toBe(0);
//     });

//     test("should return 401 if not authenticated", async () => {
//       await api.delete("/api/user/profile").expect(401);
//     });
//   });
// });
