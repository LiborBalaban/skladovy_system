const getEmployee = require('express').Router();
const employee = require('../../models/employeeModel');

getEmployee.get("/get-employee", (req, res) => {
    employee.find({})
        .then(docs => {
            return res.json({
                msg: "Úspěšně se nám podařilo získat zaměstnance",
                documents: docs
            });
        })
        .catch(err => {
            return res.json({
                msg: "Bohužel nedošlo k získání pozic",
                documents: []
            });
        });
});
module.exports = getEmployee;