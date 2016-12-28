const assert = require("assert");
const User = require("../src/user");

describe("Updating a user", () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name: "Joe", likes: 0});
        joe.save()
          .then(() => done());
    });

    function assertName(operation, done){
        operation
          .then(() => User.find({}))
          .then((users) => {
              assert(users.length === 1);
              assert(users[0].name === "Alex");
              done();
          });
    }

    it("should update a model instance using set and save", (done) => {
        joe.set("name", "Alex");
        assertName(joe.save(), done);        
    });

    it("should update a model instance", (done) => {
        assertName(joe.update({name: "Alex"}), done);
    });    

    it("should update model instances using class method", (done) => {
        // Update a bunch of records with some given criteria
        assertName(
            User.update({name: "Joe"}, {name: "Alex"}),
            done
        );
    });

    it("should update a model instance using class method findAndUpdate", (done) => {
        // Update a record with some given criteria
        assertName(
            User.findOneAndUpdate({name: "Joe"}, {name: "Alex"}),
            done
        );
    });

    it("should update a model instance using class method findByIdAndUpdate", (done) => {
        // Update a record with a given id
        assertName(
            User.findByIdAndUpdate(joe._id, {name: "Alex"}),
            done
        );
    });

    it("it should increment user likes by 10", (done) => {
        // Update a bunch of records with some given criteria
        User.update({name: "Joe"}, {$inc: {likes: 10}})
          .then(() => User.findOne({name: "Joe"}))
          .then((user) => {
              assert(user.likes === 10);
              done();
          });
    });    
});