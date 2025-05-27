const express = require('express');
const router = express.Router();
const { insert, getAll, getByQuery, deleteById, updateById } = require('../modules/actions');

router.get('/', (req, res) => {
    res.send("Hello World");
});
router.post('/data', async (req, res) => {
    console.log(req.body);
    await insert(req.body).catch(err=>console.error(err));
    res.send("Save new data!!");
});
router.get('/alldata', async (req, res) => {
    // const data = require('../Dummy/data');
    const data = await getAll().catch(err=>console.error(err));
    res.send(data);
});
router.get('/data', async (req, res) => {
    const obj = req.query;
    const data = await getByQuery(obj).catch(err=>console.error(err));
    console.log(data);
    if(data){
        res.send(data);
    }else{
        res.status(404).send({message: "Data not found"});
    }
});
router.delete('/delete/:id', async (req,res)=>{
    const id = req.params.id;
    try{
        await deleteById(id).catch(err=>console.error(err));
        res.send(`Delete ${id} success`);
    }catch(e){
        res.status(500).send({message:e.message});
    }
});
router.put('/update/:id', async (req,res)=>{
    const id = req.params.id;
    const newData = req.body;
    try{
        await updateById(id, newData).catch(err=>console.error(err));
        res.send(`Update ${id} success`);
    }catch(e){
        res.status(500).send({message:e.message});
    }
});

module.exports = router;