const bcrypt = require("bcrypt");

exports.encrypt = async function (password) {
  const salt = await bcrypt.getSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

exports.varifyPassword = async function (inputPassword, dbPassword) {
  const compore = await bcrypt.compare(inputPassword, dbPassword);
  return compore;
};
