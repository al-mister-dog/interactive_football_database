const request = require("supertest");
const app = require("../../../app");

describe("search requests", () => {
  const urls = ['users', 'players', 'teams'];
  it.each(urls)("should receive a 200 response for a valid search request", async (url) => {
    const response = await request(app).get(`/api/search/${url}/?searchValue=a`);
    expect(response.status).toBe(200)
  })
  it.each(urls)("should receive a 200 response and empty array for an invalid user search request", async (url) => {
    const response = await request(app).get(`/api/search/${url}/?searchValue=abcdefg12345*`);
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })
})