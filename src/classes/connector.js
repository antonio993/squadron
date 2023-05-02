import { Pin } from './pin';

export class Connector {
  /**
   *
   * @param {Object} config
   * @param {String} id
   * @param {String} name
   * @param {String} description
   * @param {String} status
   * @param {String} type
   * @param {Array} pins
   */
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.description = config.description;
    this.status = config.status;
    this.type = config.type;
    this.pins = config.pins;
  }

  static fromApi(connector) {
    if (!connector) {
      return null;
    }

    const { id, name, description, status, type, pins } = connector;
    return new Connector({
      id,
      name,
      description,
      status,
      type,
      pins: pins.map(pin => Pin.fromApi(pin))
    });
  }

  static toApi(connector) {
    if (!connector) {
      return null;
    }

    const { id, name, description, status, type, pins } = connector;

    return {
      id,
      name,
      description,
      status,
      type,
      pins
    };
  }
}