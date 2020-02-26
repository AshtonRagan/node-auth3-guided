const bcrypt = require("bcryptjs");
const jsw = require("jsonwebtoken");

const Users = require("../users/users-model.js");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const secret = process.env.JWT_SECRET || "keep it safe";

  if (authorization) {
    jwt.verify(authorization, secret, (err, decode) => {
      if (err) {
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.decodedToken = decode;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};
