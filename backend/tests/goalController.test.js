const request = require("supertest");
const app = require("../app1"); // Assuming your Express app is exported from server.js
const mongoose = require("mongoose");

// Import the Goal model
const Goal = require("../models/goalModel");

// Define the test data
const testGoal = {
  name: "Test Goal",
  distance: 10,
  duration: 7200, // Updated duration in seconds
  date: new Date().toISOString(),
};

describe("Goal Controller", () => {
  // Hook to run before each test case
  beforeEach(async () => {
    // Clear the Goal collection before each test
    await Goal.deleteMany({});
  });

  // Hook to run after all test cases
  afterAll(async () => {
    // Close the MongoDB connection
    await mongoose.connection.close();
  });

  // Test the createGoal function
  it("should create a new goal", async () => {
    const response = await request(app).post("/api/goals").send(testGoal);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(testGoal);

    // Check if the goal is saved in the database
    const goal = await Goal.findOne({
      name: testGoal.name,
    });
    expect(goal).toBeDefined();
  });

  // Test the getGoals function
  it("should get all goals", async () => {
    // Create test goals in the database
    await Goal.create(testGoal);
    await Goal.create({
      name: "Another Goal",
      distance: 5,
      duration: 5400, // Updated duration in seconds
      date: new Date().toISOString(),
    });

    const response = await request(app).get("/api/goals");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  // Test the getGoal function
  it("should get a goal by ID", async () => {
    // Create a test goal in the database
    const createdGoal = await Goal.create(testGoal);

    const response = await request(app).get(`/api/goals/${createdGoal._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(testGoal);
  });
  // Test the updateGoal function
  it("should update an existing goal", async () => {
    // Create a test goal in the database
    const createdGoal = await Goal.create(testGoal);

    // Prepare the updated goal data
    const updatedGoalData = { ...testGoal, duration: 5000 };

    const response = await request(app)
      .put(`/api/goals/${createdGoal._id}`)
      .send(updatedGoalData);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: "Goal updated successfully",
      updatedGoal: updatedGoalData,
    });

    // Check if the goal is updated in the database
    const updatedGoal = await Goal.findById(createdGoal._id);
    expect(updatedGoal.duration).toBe(updatedGoalData.duration);
    // Check other updated fields as needed
  });

  // Test the deleteGoal function
  it("should delete an existing goal", async () => {
    // Create a test goal in the database
    const createdGoal = await Goal.create(testGoal);

    const response = await request(app).delete(`/api/goals/${createdGoal._id}`);

    expect(response.status).toBe(200);

    // Check if the goal is deleted from the database
    const deletedGoal = await Goal.findById(createdGoal._id);
    expect(deletedGoal).toBeNull();
  });
});
