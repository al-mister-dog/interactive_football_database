const request = require("supertest");
const app = require("../../../app");
const testDB = require("../../../utils/testUtils");

describe("social endpoints", () => {
  const getRequests = [
    "/api/social/get-followers/?id=2",
    "/api/social/get-user-followers/?id=2",
    "/api/social/get-bookmarks/?tableId=1",
    "/api/social/get-user-bookmarks/?id=1",
    "/api/social/check-bookmark/?tableId=1&bookmarkerId=2",
    "/api/social/favourite-teams/?id=2",
    "/api/social/interests/?id=1",
  ];

  it.each(getRequests)(
    "should receive a 200 response from all social get requests",
    async (endPoint) => {
      const response = await request(app).get(endPoint);
      expect(response.status).toBe(200);
    }
  );

  it("returns an object from get followers", async () => {
    const response = await request(app).get("/api/social/get-followers/?id=2");
    expect(Object.keys(response.body[0])).toEqual([
      "follower_id",
      "followee_id",
    ]);
  });
  it("returns an object from get user followers", async () => {
    const response = await request(app).get(
      "/api/social/get-user-followers/?id=2"
    );
    expect(Object.keys(response.body[0])).toEqual([
      "username",
      "path",
      "followee_id",
    ]);
  });
  it("returns an object from get bookmarks", async () => {
    const response = await request(app).get(
      "/api/social/get-bookmarks/?tableId=1"
    );
    expect(Object.keys(response.body[0])).toEqual([
      "id",
      "table_id",
      "bookmarkee_id",
      "bookmarker_id",
      "bookmark_key",
    ]);
  });
  it("returns an object from get user bookmarks", async () => {
    const response = await request(app).get(
      "/api/social/get-user-bookmarks/?id=2"
    );
    expect(Object.keys(response.body[0])).toEqual([
      "id",
      "table_id",
      "bookmarkee_id",
      "bookmarker_id",
      "bookmark_key",
    ]);
  });
});

describe("post requests", () => {
  const postRequests = [
    {
      url: "/api/social/bookmark",
      options: { tableId: 1, bookmarkeeId: 1, bookmarkerId: 3 },
    },
    { url: "/api/social/follow", options: { followerId: 1, followeeId: 2 } },
    {
      url: "/api/social/unfollow",
      options: { followerId: 1, followeeId: 2 },
    },
    {
      url: "/api/social/favourite-teams",
      options: { teamId: 1, userId: 1, num: 1 },
    },
    { url: "/api/social/interests/", options: { id: 1, text: "testing" } },
  ];
  it.each(postRequests)(
    "should receive a 200 response from all social post requests",
    async (endPoint) => {
      const response = await request(app)
        .post(endPoint.url)
        .send(endPoint.options);
      expect(response.status).toBe(200);
      if (endPoint.url === "/api/social/unfollow") {
        await testDB.postFollow();
      }
    }
  );
  it("should receive a 200 response from delete bookmark request", async () => {
    const bookmark = await testDB.getBookmarks();
    const bookmarkId = bookmark[0].id;
    const response = await request(app)
      .delete("/api/social/bookmark")
      .send({ id: bookmarkId });
    expect(response.status).toBe(200);
  });
  it("should receive a 200 response from unbookmark request", async () => {
    const response = await request(app)
      .delete("/api/social/unbookmark")
      .send({ tableId: 1, bookmarkerId: 3 });
    expect(response.status).toBe(200);
    await testDB.postBookmark();
  });
});