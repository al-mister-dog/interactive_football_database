const request = require("supertest");
const app = require("../../../app");

describe("get requests", () => {
  const validGetRequests = [
    "/api/users/get-user-tables/?userId=1",
    "/api/users/user-table-info/?id=1",
    "/api/users/get-username/?id=1",
    "/api/users/get-users/",
    "/api/users/get-single-user/?id=1",
    "/api/users/profile-pic/?id=1",
  ];
  const invalidGetRequests = [
    "/api/users/get-user-tables/?userId=999",
    "/api/users/user-table-info/?id=999",
    "/api/users/get-username/?id=999",
    "/api/users/get-single-user/?id=999",
    "/api/users/profile-pic/?id=999",
  ];
  it.each(validGetRequests)(
    "should receive a 200 response from all valid user get requests",
    async (endPoint) => {
      const response = await request(app).get(endPoint);
      expect(response.status).toBe(200);
    }
  );
  it.each(invalidGetRequests)(
    "should receive a 200 response and empty array from all invalid user get requests",
    async (endPoint) => {
      const response = await request(app).get(endPoint);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([])
    }
  );
});

describe("post requests", () => {
  it("should receive a 200 response when user saves table with valid token", async () => {
    const response = await request(app)
      .post("/api/users/save-user-table")
      .send({
        title: "title",
        description: "description",
        url: "test.com",
        userId: 1,
        token: "3920551edf01e14e70348363706f886c",
      });
    expect(response.status).toBe(200);
  });
  it("should receive a 401 status when user tries to save table with invalid token", async () => {
    const response = await request(app)
      .post("/api/users/save-user-table")
      .send({
        title: "title",
        description: "description",
        url: "test.com",
        userId: 2,
        token: "asd",
      });
    expect(response.status).toBe(401);
  });
  it("should receive a 200 response from user delete request", async () => {
    const response = await request(app)
      .delete("/api/users/delete-table")
      .send({ id: 1 });
    expect(response.status).toBe(200);
  });
});
