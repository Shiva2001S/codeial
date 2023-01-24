const User = require('../models/user');

module.exports.signIn = function (req, res) {
    return res.render("user_sign_in", {
        title : "codeial | sign in"
    });
}

module.exports.signUp = function (req, res) {
    return res.render("user_sign_up", {
        title : "codeial | sign up"
    });
}

module.exports.create = function (req, res) {
    if(req.body.password != req.body.confirm_password){
        return res.redirect("back");
    }
    console.log(req.body);
    User.findOne({email : req.body.email}, function (err, user) {
        if(err){
            console.log("Erorr in finding the user\n");
            return;
        }

        if(!user){
            User.create({
                email : req.body.email,
                name : req.body.name, 
                password : req.body.password

            }, function (err, user) {
                if(err){
                    console.log("Error in creating the user\n");
                    return;
                }

                return res.redirect('/user/sign-in');
            });
        }else {
            return res.redirect("back");
        }
    })
}