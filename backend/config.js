const mongoose = require('mongoose');

const DB = "mongodb+srv://sajay3159:Ajaysahani1234@cluster0.za38y2b.mongodb.net/My_blog"
mongoose.connect(DB , {
  useNewUrlParser : true ,
//    useCreateIndex : false, 
    useUnifiedTopology : true 
   // useFindAndModify : false
}).then(() => {
   console.log("connection successful");
}).catch((err) => console.log('no connection'));


// mongoose.connect("mongodb://localhost:27017/e-comm");
// const DB = "mongodb://localhost:27017/e-comm"
// mongoose.connect(DB , {
//   useNewUrlParser : true ,
// //    useCreateIndex : false, 
//     useUnifiedTopology : true 
//    // useFindAndModify : false
// }).then(() => {
//    console.log("connection successful");
// }).catch((err) => console.log('no connection'));