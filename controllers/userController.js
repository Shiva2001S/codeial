const User = require('../models/user');

module.exports.signIn = function (req, res) {
    return res.render("user_sign_in", {
        title: "codeial | sign in"
    });
}

module.exports.signUp = function (req, res) {
    return res.render("user_sign_up", {
        title: "codeial | sign up"
    });
}

module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect("back");
    }
    // console.log(req.body);
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("Erorr in finding the user\n" + `${err}`);
            return res.redirect("back");
        }

        if (!user) {
            User.create({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password

            }, function (err, user) {
                if (err) {
                    console.log("Error in creating the user\n");
                    console.log(err);

                    return;
                }

                return res.redirect('/user/sign-in');
            });
        } else {
            return res.redirect("back");
        }
    })
}

module.exports.createSession = function (req, res) {
    
    User.findOne({email : req.body.email}, function (err, user) {
        if(err){
            console.log(err);
            return;
        }

        if (user) {
            if (req.body.password != user.password) {
                return res.redirect('back');
            }
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile');
        } else {
            return res.redirect('back');
        }
    })
}

module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, function (err, user) {
            if(err){
                console.log(err);
                return;
            }

            if (user) {
                res.render('user_profile', {
                    title : "user profile", 
                    user : user
                })
            } else {
                return res.redirect('/user/sign-in');
            }
        })
    } else {
        return res.redirect('/user/sign-in');  
    }
}