module.exports = {
  //defines path for authenticated users
  usersOnly: (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).send("Please log in");
    }
    next();
  },
  adminsOnly: (req, res, next) => {
    if (!isAdmin) {
      return res.status(403).send("You are not an admin");
    }
    next();
  }
};
