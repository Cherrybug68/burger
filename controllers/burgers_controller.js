var express = require("express");

var router = express.Router();

// IMPORT THE MODEL (burger.js) TO USE IT'S DATABASE FUNCTIONS.
var burger = require("../models/burger.js");

// ROUTES
router.get("/", function(req, res) {
    res.redirect("/burgers");
});

router.get("/burgers", function(req,res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/burgers/create", function(req, res) {
    burger.create([
        "burger_name"
    ], [
        req.body.burger_name
    ], function() {
        res.redirect("/burgers");
    });
});

router.put("/burgers/update/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function() {
        res.redirect("/burgers");
    });
});

// EXPORT ROUTES FOR server.js TO USE.
module.exports = router;