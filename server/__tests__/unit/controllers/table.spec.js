const request = require("supertest");
const app = require("../../../app");

describe("get requests", () => {
  const direction = [true, false];
  const filterQuery = "field=playerId&value=1";
  const selectedField = "age";
  const id = 1;
  const teamId = 1;
  const getRequests = [
    "/api/table/get-all-teams",
    "/api/table/get-teams/1",
    "/api/table/get-team-page-data/1",
    "/api/table/get-team/1",
    "/api/table/get-data/?id=",
    "/api/table/get-team-page-data/1",
    `/api/table/filter/?${filterQuery}&id=${teamId}`,
    `/api/table/sort/?field=${selectedField}&direction=${direction[0]}&id=${teamId}`,
    `/api/table/sort/?field=${selectedField}&direction=${direction[1]}&id=${teamId}`,
    `/api/table/sort-filtered/?direction=${direction[0]}&id=${teamId}&${filterQuery}&fieldToOrderBy=${selectedField}`,
    `/api/table/sort-filtered/?direction=${direction[1]}&id=${teamId}&${filterQuery}&fieldToOrderBy=${selectedField}`,
    "/api/table/get-random-url",
    `/api/table/team-logo/?id=${id}`,
  ];
  it.each(getRequests)(
    "should receive a 200 response from all table get requests",
    async (endPoint) => {
      const response = await request(app).get(endPoint);
      expect(response.status).toBe(200);
    }
  );
});