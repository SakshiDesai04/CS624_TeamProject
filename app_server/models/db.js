const mongoose = require('mongoose');
const readLine = require('readline');

let dbURI = 'mongodb://localhost/CareerFirst';    
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGODB_URI;
    //dbURI = "mongodb+srv://Maahi:MahiV%401410@cs624.fhfhs.mongodb.net/CS624";
    console.log(`Inside if ${dbURI}`)
  }
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