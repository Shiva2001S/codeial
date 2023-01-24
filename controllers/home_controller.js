module.exports.home = function (req, res) {
    // return res.end('<h1>Codeial is running</h1>')
    res.cookie("name", "shyam");
    console.log(req.cookies);
    return res.render("home", {
        title : "mycodeial"
    });
};