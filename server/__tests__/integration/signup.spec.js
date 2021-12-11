const request = require("supertest");
const app = require("../../app");
const testDB = require("../../utils/testUtils");

const signup = (
  username = "user1",
  email = "user1@mail.com",
  password = "P4ssword"
) => {
  return request(app)
    .post("/api/auth/signup")
    .send({ username, email, password });
};

const login = (email = "user1@mail.com", password = "P4ssword") => {
  return request(app).post("/api/auth/login").send({ email, password });
};

const deleteUser = () => {
  return testDB.deleteUser();
};

describe("user registration", () => {
  it("returns a 200 OK response when signup is valid", async () => {
    const response = await signup();
    expect(response.status).toBe(200);
    await deleteUser();
  });

  it("returns a success message when signup is valid", async () => {
    const response = await signup();
    expect(response.body.msg).toBe("All signed up");
    await deleteUser();
  });

  it("returns a 400 response when username is invalid", async () => {
    const response = await signup("a", "user1@mail.com", "P4ssword");
    expect(response.status).toBe(400);
  });
  it("returns a 400 response when email is invalid", async () => {
    const response = await signup("user1", "a", "P4ssword");
    expect(response.status).toBe(400);
  });
  it("returns a 400 response when password is invalid", async () => {
    const response = await signup("user1", "user1@mail.com", "a");
    expect(response.status).toBe(400);
  });
  it("returns a 400 response when email is already in use", async () => {
    await signup();
    const response = await signup();
    expect(response.status).toBe(400);
    await deleteUser();
  });
  it("returns correct error message when username is less than 6 characters", async () => {
    const response = await signup("a", "user1@mail.com", "P4ssword");
    const errorMsg = response.body.validationErrors.error.msg;
    expect(errorMsg).toBe("Username must be between 3 and 32 characters");
  });
  it("returns correct error message when username is more than 32 characters", async () => {
    const response = await signup("a".repeat(33), "user1@mail.com", "P4ssword");
    const errorMsg = response.body.validationErrors.error.msg;
    expect(errorMsg).toBe("Username must be between 3 and 32 characters");
  });
  it("returns correct error message when email is invalid", async () => {
    const response = await signup("user1", "a", "P4ssword");
    const errorMsg = response.body.validationErrors.error.msg;
    expect(errorMsg).toBe("Please enter a valid email");
  });
  it("returns correct error message when password is less than 6 characters", async () => {
    const response = await signup("user1", "user1@mail.com", "aaaaa");
    const errorMsg = response.body.validationErrors.error.msg;
    expect(errorMsg).toBe("password must be 6 characters or more");
  });
  it("returns correct error message when password contains no numbers", async () => {
    const response = await signup("user1", "user1@mail.com", "Password");
    const errorMsg = response.body.validationErrors.error.msg;
    expect(errorMsg).toBe("please enter a valid password");
  });
  it("returns correct error message when email is already in use", async () => {
    await signup();
    const response = await signup();
    const errorMsg = response.body.validationErrors.error.msg;
    expect(errorMsg).toBe("email in use");
    await deleteUser();
  });
});

describe("user login", () => {
  it("returns a 200 OK response when login is valid", async () => {
    await signup();
    const response = await login();
    expect(response.status).toBe(200);
    await deleteUser();
  });

  it("returns an object with user details when login is valid", async () => {
    await signup();
    const response = await login();
    expect(Object.keys(response.body)).toEqual(["id", "username", "token"]);
    await deleteUser();
  });

  it("returns correct error message when email is invalid", async () => {
    const response = await login("a", "P4ssword");
    expect(response.body.message).toBe(
      "The email address you entered isn't connected to an account"
    );
  });
  it("returns correct error message when email is invalid", async () => {
    const response = await login("userX@mail.com", "P4ssword");
    expect(response.body.message).toBe("Email not found");
  });
  it("returns a 400 response when password is invalid", async () => {
    await signup();
    const response = await login("user1@mail.com", "incorrectP4ssword");
    expect(response.body.message).toBe("Incorrect password");
    await deleteUser();
  });
  it("returns a 401 unauthorized response when email is invalid", async () => {
    await signup();
    const response = await login("a", "P4ssword");
    expect(response.status).toBe(401);
    await deleteUser();
  });
});