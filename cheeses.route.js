const { query } = require("express");
var Cheese = require("./cheese.model")

module.exports = function(app) {
    app.get(`/api/v1/cheeses`, async function(req, res, next) {
        try {
            var result = await Cheese.find()

            var output = {
                count: result.length,
                next: `${req.protocol}://${req.hostname}${ req.hostname == "localhost" ? ":" + process.env.PORT : "" }${req.originalUrl}?offset=20`,
                previous: null,
                url: `${req.protocol}://${req.hostname}${ req.hostname == "localhost" ? ":" + process.env.PORT : "" }${req.originalUrl}`,
                results: result
            }
            res.json(output)

        } catch (error) {
            return next(error)
        }
    });

    app.get("/api/v1/cheeses/:id", async function (req, res, next) {
        try {
            var result = await Cheese.findById(req.params.id);

            if(!result) {
                res.status(404);
                response.end();
                return
            }

            res.json(result)
        
        } catch {
            return next(error)
        }
    })


    app.post("/api/v1/cheeses", function(req, res, next) {
        try {
            var cheese = new Cheese({
                name: req.fields.name,
                price: req.fields.price,
                weight: req.fields.weight,
                strength: req.fields.strength,
                brand: req.fields.brand
            });
            cheese.save()

            res.status(201)
            res.json(cheese)
        } catch (error) {
            return next(error)
        }
    })



    app.patch("/api/v1/cheeses/:id", async function(req, res, next) {
        try {
            var {name, price, weight, strength, brand} = req.fields;
            var updateObject = {}

            if (name) updateObject.name = name
            if (price) updateObject.price = price
            if (weight) updateObject.weight = weight
            if (strength) updateObject.strength = strength
            if (brand) updateObject.brand = brand

            await Cheese.findByIdAndUpdate(req.params.id, updateObject)

            var cheese = await Cheese.findById(req.params.id)

            res.status(200)
            res.json(cheese);

        } catch (error) {
            return next(error)
        }
    })



    app.delete("/api/v1/cheeses/:id", async function(req, res, next) {
        try {
            await Cheese.findByIdAndRemove(req.params.id)
            res.status(204)
            res.end()
        } catch (error) {
            return next(error)
        }
    })
}