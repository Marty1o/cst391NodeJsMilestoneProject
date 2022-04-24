const express = require('express');
const connection = require("../connection");

// this will initialize the router
const router = express.Router();


// path to the first route ,,,, note that all route in here are starting with /items
router.get('/read', (req, res, next) => {
    var query = "select *from item";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else
            return res.status(500).json(err);
    })
});

//post used to add/create new item to DB
router.post('/create', (req, res, next) => {
    let item = req.body;
    // the data that will be passed on to the DB to item can be added
    var query = "insert into item (name,price,color,size,description) values(?,?,?,?,?)";
    // the actual values that are being passed in
    connection.query(query, [item.name, item.price, item.color, item.size, item.description], (err, results) => {
        // here we are doing a test for error
        if (!err) {
            //if err is not true them item has been added. status 200 is sent to indicate this and also message so user can read it and know
            return res.status(200).json({ message: "Item has been added successfully" });
        }
        else
            // anything else means adding the item did not work and error 500 will be sent
            return res.status(500).json(err);
    })
});
// this will be used to update an item via ID that is provided in URL ex /update/1
router.patch('/update/:id', (req, res, next) => {
    const id = req.params.id;
    let item = req.body;
    var query = "update item set name=?,price=?,color=?,size=?,description=? where id=?";;
    connection.query(query,[item.name, item.price, item.color, item.size, item.description, id],(err,results)=>{
        // here we are doing a test for error
        if (!err) {
            //if err is not true we will still need to see if item was found
            if (results.affectedRows == 0) {
                //this will let the user know id not found therefore no update made
                return res.status(404).json({ message: "Product id is not found" });
            }
            // successful update
            return res.status(200).json({ message: "Item has been updated successfully" });
        }
        else
            // anything else means adding the udpate did not work for other reasons and error 500 will be sent
            return res.status(500).json(err);
    });
});
// this will delete an item via /delete/:id
router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    var query = "delete from item where id=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product ID was not found" });
            }
            return res.status(200).json({ message: "Product Deleted Sucessfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

// will allow you to make use of router
module.exports = router;
