const dns = require('dns');
// Set default result order for DNS resolution
dns.setDefaultResultOrder('ipv4first');


const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/students-api", {
    // useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Connection Successful");
}).catch((e) => {
    console.log("Connection Failed");
});