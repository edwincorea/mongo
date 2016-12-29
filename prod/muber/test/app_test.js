const assert = require("assert");

//fake HTTP requests to Express app
const request = require("supertest");

const app = require("../app");

describe("The Express app", () => {

    it("should handle a GET request to /api", (done) => {
        request(app)
          .get("/api")
          .end((err, response) => {
              assert(response.body.hi === "there");
              done();
          });                
    });    

});