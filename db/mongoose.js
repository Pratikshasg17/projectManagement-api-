const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/tpl", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', function() {
  console.log("connect");
});
