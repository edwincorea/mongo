const assert = require("assert");
const User = require("../src/user");

describe("Validating records", () => {

    it("should require a user name", (done) => {
        const user = new User({name: undefined});
        const validationResult = user.validateSync(); //synchronous validation
        //async validation method
        //user.validate((validationResult) => {});

        const { message } = validationResult.errors.name;
        assert(message === "Name is required.");
        done();
    });

    it("should require a user name longer than 2 characters", (done) => {
        const user = new User({name: "Al"});
        const validationResult = user.validateSync(); //synchronous validation

        const { message } = validationResult.errors.name;
        assert(message === "Name must be longer than 2 characters.");
        done();
    });

    it("should disallow invalid records from being saved", (done) => {
        const user = new User({name: "Al"});
        user.save()
          .catch((validationResult) => {
              const { message } = validationResult.errors.name;
              assert(message === "Name must be longer than 2 characters.");
              done();
          });
    });
    
});