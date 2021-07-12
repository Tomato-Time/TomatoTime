const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class User {
  static async login(credentials) {
    //
    // if any of this goes wrong throw an error
    throw new UnauthorizedError("Invalid email/password");
  }
  static async register(credentials) {
    // create a new user in the db with all of their info and return the user
  }
}
module.exports = User;
