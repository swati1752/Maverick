const express = require('express')
const axios = require('axios')
const router = new express.Router()

// router.post('/data', (req, res) => {
//     const data = req.body;
//     console.log('Received data from NodeMCU:', data);
//     // You can process the data or send a response back to the NodeMCU
//     res.send('Data received successfully');
//   });

router.post('/getResponse' ,async (req, res) => {
    const data = req.body
    try {
        const resp = await axios.post('http://127.0.0.1:5000',data );
        // console.log('ad')
        // {
        //     "sweet":54,
        //     "sour":65,
        //     "pungent":87,
        //     "bitterness":89,
        //     "option":0
        // }
        console.log(resp.data.result)
        res.status(201).send(resp.data.result);
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router