// activityController.test.js

const request = require("supertest");
const app = require("../app"); // Assuming your Express app is exported from App.js
const mongoose = require("mongoose");

// Import the Activity model
const Activity = require("../models/activityModel");

// Define the test data
const testActivity = {
  activityName: "Test Activity",
  startTime: "10:00",
  date: new Date().toISOString(),
  activityType: "running",
  duration: "1:00:00",
  distance: 5,
  pace: 10,
  notes: "Test notes",
};

describe("Activity Controller", () => {
  // Hook to run before each test case
  beforeEach(async () => {
    // Clear the Activity collection before each test
    await Activity.deleteMany({});
  });

  // Hook to run after all test cases
  afterAll(async () => {
    // Close the MongoDB connection
    await mongoose.connection.close();
  });

  // Test the createActivity function
  it("should create a new activity", async () => {
    const response = await request(app)
      .post("/api/activities")
      .send(testActivity);

    expect(response.status).toBe(201);
    expect(response.body.activity).toMatchObject(testActivity);

    // Check if the activity is saved in the database
    const activity = await Activity.findOne({
      activityName: testActivity.activityName,
    });
    expect(activity).toBeDefined();
  });

  // Test the getActivityById function
  it("should get an activity by ID", async () => {
    // Create a test activity in the database
    const createdActivity = await Activity.create(testActivity);

    const response = await request(app).get(
      `/api/activities/${createdActivity._id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(testActivity);
  });

  // Test the updateActivity function
  it("should update an existing activity", async () => {
    // Create a test activity in the database
    const createdActivity = await Activity.create(testActivity);

    const updatedActivityData = {
      activityName: "Updated Test Activity",
      // Update other fields as needed
    };

    const response = await request(app)
      .put(`/api/activities/update/${createdActivity._id}`)
      .send(updatedActivityData);

    expect(response.status).toBe(200);
    expect(response.body.activity).toMatchObject(updatedActivityData);

    // Check if the activity is updated in the database
    const updatedActivity = await Activity.findById(createdActivity._id);
    expect(updatedActivity.activityName).toBe(updatedActivityData.activityName);
    // Check other updated fields as needed
  });

  // Test the deleteActivity function
  it("should delete an existing activity", async () => {
    // Create a test activity in the database
    const createdActivity = await Activity.create(testActivity);

    const response = await request(app).delete(
      `/api/activities/delete/${createdActivity._id}`
    );

    expect(response.status).toBe(200);

    // Check if the activity is deleted from the database
    const deletedActivity = await Activity.findById(createdActivity._id);
    expect(deletedActivity).toBeNull();
  });
});
