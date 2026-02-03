const isAdminLoggedIn = (req, res, next) => {
    if (req.session.admin) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

module.exports = { isAdminLoggedIn };