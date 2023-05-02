export class User {
  /**
   *
   * @param {Object} config
   * @param {String} token
   */
  constructor(config) {
    this.token = config.token;
  }

  static fromApi(user) {
    if (!user) {
      return null;
    }

    const { username, token } = user;
    return new User({
      username,
      token
    });
  }

  static toApi(user) {
    if (!user) {
      return null;
    }

    const { email, password } = user;

    return {
      email,
      password
    };
  }
}