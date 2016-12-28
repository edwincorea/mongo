const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {

    it("should create a user with subdocuments of post schema", (done) => {
        const joe = new User({
            name: "Joe",
            posts: [ {title: "PostTitle"} ]
        });

        joe.save()
          .then(() => User.findOne({name: "Joe"}))
          .then((user) => {
              assert(user.posts[0].title === "PostTitle");
              done();
          });        
    });

    it("should add subdocuments of post schema to an existing user", (done) => {
        const joe = new User({
            name: "Joe",
            posts: []            
        });

        joe.save()
          .then(() => User.findOne({name: "Joe"}))
          .then((user) => {
              user.posts.push({title: "New Post"});
              return user.save();              
          })
          .then(() => User.findOne({name: "Joe"}))
          .then((user) => {
              assert(user.posts[0].title === "New Post");
              done();
          });                  
    });

    it("should remove an existing subdocument of post schema", (done) => {
        const joe = new User({
            name: "Joe",
            posts: [{title: "New Title"}]            
        });

        joe.save()
          .then(() => User.findOne({name: "Joe"}))
          .then((user) => {
              const post = user.posts[0]; 
              post.remove();
              return user.save();              
          })
          .then(() => User.findOne({name: "Joe"}))
          .then((user) => {
              assert(user.posts.length === 0);
              done();
          });                  
    });
    
});