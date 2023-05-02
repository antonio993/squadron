const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');
const app = express();
app.use(cors());
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  jsonReader('./connectors.json', (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  })
});

app.put('/write/:id', (req, res) => {
  jsonReader('./connectors.json', (err, data) => {
    if(err) {
      res.json(err);
    } else {
      const connector = req.body;
      const target = data.find(item => item.id == req.params.id);
      Object.assign(target, connector);
      console.log(connector);
      fs.writeFile('./connectors.json', JSON.stringify(data, null, 2), err => {
        if(err) {
          res.json(err);
        } else {
          jsonReader('./connectors.json', (err, data) => {
            if (err) {
              res.json(err);
            } else {
              res.json(connector);
            }
          })
        }
      })
    }
  })
});

app.post('/write', (req, res) => {
  jsonReader('./connectors.json', (err, data) => {
    if(err) {
      res.json(err);
    } else {
      const connector = req.body;
      connectorWithId = {...connector, id: uuidv1()};
      data = [...data, connectorWithId];
      fs.writeFile('./connectors.json', JSON.stringify(data, null, 2), err => {
        if(err) {
          res.json(err);
        } else {
          jsonReader('./connectors.json', (err, data) => {
            if (err) {
              res.json(err);
            } else {
              res.json(connectorWithId);
            }
          })
        }
      })
    }
  })
});

function jsonReader(filePath, cb) {
  fs.readFile(filePath, 'utf-8', (err, fileData) => {
    if(err) {
      return cb && cb(err);
    }

    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (error) {
      return cb && cb(err);
    }
  })
}

app.listen(5000, () => { console.log("Server started on port 5000") });