const mongoose = require('mongoose');
const readLine = require('readline');

let dbURI = 'mongodb://localhost/CareerFirst';    

  mongoose.connect(dbURI, { useNewUrlParser: true });
  
  mongoose.connection.on( 'connected', () => {
    console.log (`Mongoose connected to ${dbURI}`);
  });
  mongoose.connection.on('error', err => {                    
    console.log(`Mongoose connection error: ${err}`);         
  });                                                         
  mongoose.connection.on('disconnected', () => {              
    console.log('Mongoose disconnected');                     
  });    
  
  require('./users');
  require('./jobs');