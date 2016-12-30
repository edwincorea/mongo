const Driver = require("../models/driver");

module.exports = {
    apiInfo(req, res) {
        res.send({status: "Muber API 1.0"});
    },

    index(req, res, next) {
        const {lng, lat} = req.query; //get these values from querystring, not body
        
        //maxDistance: 200Km
        Driver.geoNear(
            {type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)]},
            {spherical: true, maxDistance: 200000}
        )
          .then(drivers => res.send(drivers))
          .catch(next);
    },

    create(req, res, next) {
        const driverProps = req.body;

        Driver.create(driverProps)
          .then(driver => res.status(201).send(driver))
          .catch(next);
    },

    edit(req, res, next) {
        const driverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndUpdate({_id: driverId}, driverProps)
          .then(() => Driver.findById({_id: driverId}))
          .then(driver => res.status(200).send(driver))
          .catch(next);
    },

    delete(req, res, next) {
        const driverId = req.params.id;
        
        Driver.findByIdAndRemove({_id: driverId})
          .then(driver => res.status(204).send(driver))
          .catch(next);
    }
};