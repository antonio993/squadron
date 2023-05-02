export class Pin {
  /**
   *
   * @param {Object} config
   * @param {String} id
   * @param {String} name
   */
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
  }

  static fromApi(pin) {
    if (!pin) {
      return null;
    }

    const { id, name } = pin;
    return new Pin({
      id,
      name
    });
  }
}