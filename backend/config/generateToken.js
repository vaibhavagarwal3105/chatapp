const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "a2B12kN02", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
