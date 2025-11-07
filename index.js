const path = require('path');
const express = require('express'); const app = express(); const port = 8080;
const bodyParser = require('body-parser')
const cors = require('cors'); // Import the cors middleware
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get('/api', (req, res) => {
  res.send('Hello World!')
})
app.use(express.static(path.resolve(__dirname, './dist')));
const users = require("./usuarios")
app.use('/static', express.static('static'));
app.use('/static', express.static('dist'));
app.use("/api/users", users);

// Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist', 'index.html'));
});

const mongoose = require('mongoose');
const uri = 'mongodb://'+
            process.env.mongousr+
            ':'+
            process.env.mongopwd+
            '@kvm.xorgx11.com:27017/'
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('Connection success');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })
  .catch(error => {
    console.error('Connection fail', error);
});