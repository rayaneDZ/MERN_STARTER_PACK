const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

mongoose.connect('mongodb+srv://rayane_admin:QpS10qjZxpHbdlK4@rayanesdatabase-edxog.mongodb.net/test?retryWrites=true', {
  useNewUrlParser : true
}); 

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   if (req.method === 'OPTIONS') {
//     res.header(
//       'Access-Control-Allow-Methods',
//       'PUT, POST, PATCH, DELETE, GET'
//     );
//     return res.status(200).json({});
//   }
//   next();
// });

// app.use(cors());
// app.options('*',cors());
const User = require('./models/Users');

app.get('/api/test', (req, res) => {
console.log(mongoose.connection.readyState);
res.send('hi');
});

app.get('/api/customers', (req, res) => {
  User.find()
    .exec()
    .then( result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error : err
      });
    });
});

app.get('/api/customers/:id', (req, res) => {
  console.log('getting by id');
  const id =req.params.id;
  User.findById(id)
    .exec()
    .then(result => {
      console.log(result);
      if (result) {
        res.status(200).json(result);
      }else{
        res.status(404).json({message : 'no valid entry found'});
      }
    })
    .catch(err => {
      console.log('error');
      console.log(err);
      res.status(500).json({ error : err});
    });
});


app.post('/api/customers', (req, res) => {

  const user = new User({
    _id : new mongoose.Types.ObjectId(),
    firstname : req.body.firstname,
    lastname : req.body.lastname
  });
  user
    .save()
    .then(result => {
      console.log(result, 'done post');
      res.status(201).json({
        message : 'handling post req',
        createdUser : user
      });
    })
    .catch(err => console.log(err));
});

app.delete('/api/customers/:id', (req, res) => {
  const id = req.params.id;
  User.remove({_id : id})
    .exec()
    .then( result => {
      res.status(200).json(result);
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({
        error : err
      });
    });
});

app.patch('/api/customers/:id', (req, res) => {
  const id = req.params.id;
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.propName] = ops.value
  }
  User.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error : err
      });
    });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
