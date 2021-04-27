const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://Alexander:1q2w3e@cluster0.k1j8m.mongodb.net/chat'

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}, (err)=>{
    if (err) {
        console.error('Could not connect to MongoDB!');
        console.log(err);
    } else {
        console.log('Connected to MongoDb');
    }
})