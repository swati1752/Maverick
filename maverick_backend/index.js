const express = require('express')
const responseRouter = require('./routers/response')

const app = express()
const port = process.env.PORT||3000
app.use(express.json())
const { SerialPort } = require('serialport');
const {ReadlineParser } = require('@serialport/parser-readline');

const port1 = new SerialPort({
    path: 'COM4',
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    });
const parser = port1.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// port1.pipe(new ReadlineParser({ delimiter: '\r\n' }));
function sendDataToServer(data) {
    // Implement the logic to send data to the server here
    console.log('Sending data to server:', data);

}
parser.on('data', (line) => {
  console.log(`Received: ${line}`);
  // Handle the received data, parse it, and send it to the server.
  sendDataToServer(line);
});
app.post('/sensor-data', (req, res) => {
    const sensorData = req.body;
    console.log('Received sensor data:', sensorData);
    // Process and store the data as needed.
    res.send('Data received successfully.');
  });
app.use(responseRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})