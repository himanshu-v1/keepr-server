const express = require('express');
const router = express.Router();
const { insert, getAll, getByQuery, deleteById, updateById, getDbConnection } = require('../modules/dataActions');
let user;

router.get('/', (req, res) => {
    res.send("Hello World");
});
router.post('/data', async (req, res) => {
    user = global.userObj[req.headers.sessionid];
    const id = await insert(user, req.body).catch((err) => {
        console.error(err);
        res.status(500).send({ message: err.message });
    });
    res.send({ 
        _id: id,
        msg: "Saved new data!!"
    });
});
router.get('/alldata', async (req, res) => {
    // const data = require('../Dummy/data');
    user = global.userObj[req.headers.sessionid];
    const data = await getAll(user).catch((err) => {
        console.error(err);
        res.status(500).send({ message: err.message });
    });
    res.send(data);
});
router.get('/data', async (req, res) => {
    const obj = req.query;
    user = global.userObj[req.headers.sessionid];

    const data = await getByQuery(user, obj).catch((err) => {
        console.error(err);
        res.status(500).send({ message: err.message });
    });
    console.log(data);
    if(data){
        res.send(data);
    }else{
        res.status(404).send({message: "Data not found"});
    }
});
router.delete('/delete/:id', async (req,res)=>{
    const id = req.params.id;
    user = global.userObj[req.headers.sessionid];

    await deleteById(user, id).catch((err) => {
        console.error(err);
        res.status(500).send({ message: err.message });
    });
    res.send(`Delete ${id} success`);
});
router.put('/update/:id', async (req,res)=>{
    const id = req.params.id;
    const newData = req.body;
    user = global.userObj[req.headers.sessionid];

    await updateById(user, id, newData).catch((err )=> {
        console.error(err);
        res.status(500).send({ message: err.message });
    });
    res.send(`Update ${id} success`);
});

module.exports = router;