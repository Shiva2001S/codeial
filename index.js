const express = require('express');
const cookieParser = require('cookie-parser');
const port = 80;
const expressLayouts = require('express-ejs-layouts');


const db = require('./config/mongoose'); 
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const app = express();

app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
// We can also access the views directly writing like this without join fn also
app.set('views', './views');

app.use(session({
    // This is the name of the session cookie
    name : 'codeial',
    // This is the name of the secret key
    secret : 'blahsomething',
    // This is done so that if nothing is there in session cookie as we required so we don't need to save the extra data in session cookie
    saveUnitialized : false,
    // This is done so that we will not have save the same type of session cookie again and again
    resave : false,
    cookie : {
        // This is the age if the session cookie
        maxAge : (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
// we are setting setAuthenticatedUser as the middleware to set the authentcated user in views 
app.use(passport.setAuthenticatedUser);


// We are using express router
app.use('/', require('./routes/index'));

app.listen(port, (err)=>{
    if(err){
        console.log("Error in running the server ", err);
        return;
    }
    console.log("Server is running on port ", port);
});