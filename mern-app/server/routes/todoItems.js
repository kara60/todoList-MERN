const router = require('express').Router();

const { async } = require('regenerator-runtime');
const todoItemsModel = require('../models/todoItems');

//Add
router.post('/api/item', async (req,res) => {
    try{
        const newItem = new todoItemsModel({
            item: req.body.item
        })

        const saveItem = await newItem.save()
        res.status(200).json(saveItem);
    }
    catch(err){
        res.json(err);
    }
})

//Read
router.get('/api/items', async (req, res) => {
    try{
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems)
    }
    catch(err){
        res.json(err);
    }
})

//Update
router.put('/api/item/:id', async (req, res) => {
    try{
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json('Başarıyla Güncellendi..');
    }
    catch(err){
        res.json(err);
    }
})

//Delete
router.delete('/api/item/:id', async (req, res) => {
    try{
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id, {$set: req.body});
        res.status(200).json('Başarıyla Silindi..');
    }
    catch(err){
        res.json(err);
    }
})

module.exports = router;