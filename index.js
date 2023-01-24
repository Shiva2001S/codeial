const express = require('express');
const cookieParser = require('cookie-parser');
const port = 80;

const db = require('./config/mongoose'); 

const app = express();

app.use(express.urlencoded());

app.use(cookieParser());


// We are using express router
app.use('/', require('./routes/index'));

app.set('view engine', 'ejs');
// We can also access the views directly writing like this without join fn also
app.set('views', './views');

app.listen(port, (err)=>{
    if(err){
        console.log("Error in running the server ", err);
        return;
    }
    console.log("Server is running on port ", port);
});