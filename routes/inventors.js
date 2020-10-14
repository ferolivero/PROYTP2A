const jwt = require('express-jwt');
const express = require('express');
const router = express.Router();
const dataInventors = require('./../data/inventor');


// listado de todos los inventors
// http://localhost:3000/api/inventors/
router.get('/', async (req, res) =>{
    res.json( await dataInventors.getAllInventors());
});

// http://localhost:3000/api/inventors/8
router.get('/:id', async (req, res) =>{
    res.json(await dataInventors.getInventor(req.params.id));
});

router.post('/', async (req, res) => {
    const inventor = req.body;
    await dataInventors.pushInventor(inventor);
    const inventorPersistido = await dataInventors.getInventor(inventor._id); 
    res.json(inventorPersistido);
});

router.put('/:id', async (req, res) =>{
    const inventor = req.body;
    inventor._id = req.params.id;
    await dataInventors.updateInventor(inventor);

    res.json(await dataInventors.getInventor(req.params.id));
});

router.delete('/:id', async (req,res) => {
    console.log('Delete');
    await dataInventors.deleteInventor(req.params.id);
    res.send('Inventor eliminado');
});

module.exports = router;