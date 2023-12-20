const express = require('express')
const responseRouter = require('./routers/response')
const axios = require('axios')
const app = express()
const port = process.env.PORT||3000
app.use(express.json())
const { SerialPort } = require('serialport');
const {ReadlineParser } = require('@serialport/parser-readline');
const buffer = Buffer.alloc(1024); 
const port1 = new SerialPort({
    path: 'COM4',
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    });
const parser = port1.pipe(new ReadlineParser({ delimiter: '\r\n' }));

function sendDataToServer(dataArray) {
    const x=dataArray[dataArray.length-1]
    const y=dataArray[dataArray.length-2]
    var xx = x.replace(/(\w+)\s*:\s*([\d.]+)/, '{"$1":$2}');
    var yy = y.replace(/(\w+)\s*:\s*([\d.]+)/, '{"$1":$2}');
    xx = JSON.parse(xx);
    yy = JSON.parse(yy);
    const ress = Object.assign({}, xx, yy);
    return ress
}
var final_data
const dataArray = [];
let temp=1
parser.on('data', (line) => {
  console.log(`Received: ${line}`);
        // setTimeout(10000);
//   buffer.write(line.toString(), buffer.length, 'utf-8');
  dataArray.push(line);
    console.log(dataArray.length);
    if(dataArray.length%6==0&&temp==1){   
        final_data = sendDataToServer(dataArray);
    }
});
app.post('/sensor_data', (req, res) => {
    console.log(final_data);
    res.send(final_data);
});
// parser.on('end', () => {
//     // All data has been read
//     console.log('Finished reading data.');
  
//     // Do something with the complete buffer, if needed
//     console.log('Complete buffer:', buffer.toString('utf-8'));
//   });

app.use(responseRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})