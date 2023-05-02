import axios from 'axios';
import { compilePath, tryRequest } from '../../utils/apiUtils';

export class CrudService {
  /**
     *
     * @param {String} endpointPath
     * @param {Function} dataMapper - map data received from the API
     * @param {*} modelMapper - map data sent to API
     */
  constructor(endpointPath, dataMapper = data => data, modelMapper = model => model) {
    this.path = compilePath(endpointPath);
    this.dataMapper = dataMapper;
    this.modelMapper = modelMapper;
  }

  async fetch(urlParams) {
    return tryRequest(
      () => axios.get(
        this.path(urlParams)
      ),
      data => {
        if (data.content) {
          return data.content.map(this.dataMapper);
        }
        else {
          return data.map(this.dataMapper);
        }
      }
    );
  }

  async get(id, urlParams) {
    const path = id ? this.path(urlParams) + '/' + id : this.path(urlParams);
    return tryRequest(
      () => axios.get(path),
      this.dataMapper
    );
  }

  async create(model, urlParams) {
    return tryRequest(
      () => axios.post(this.path(urlParams), this.modelMapper(model)),
      this.dataMapper
    );
  }

  async update(id, model, urlParams) {
    const path = id ? this.path(urlParams) + '/' + id : this.path(urlParams);
    return tryRequest(
      () => axios.put(path, this.modelMapper(model)),
      this.dataMapper
    );
  }

  async delete(id, urlParams) {
    const path = id ? this.path(urlParams) + '/' + id : this.path(urlParams);

    return tryRequest(
      () => axios.delete(path)
    );
  }
}