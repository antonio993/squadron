import axios from 'axios';
import { Connector } from '../../../classes/connector';
import { tryRequest } from '../../../utils/apiUtils';
import { CrudService } from '../crudService';

class ConnectorService extends CrudService {
  async updateConnector(id, model) {
    const path = this.path() + 'write/' + id;
    return tryRequest(
      () => axios.put(path, this.modelMapper(model)),
      this.dataMapper
    );
  }

  async addConnector(model) {
    const path = this.path() + 'write';
    return tryRequest(
      () => axios.post(path, this.modelMapper(model)),
      this.dataMapper
    );
  }
}

export const connectorService = new ConnectorService(
  'http://localhost:5000/',
  Connector.fromApi,
  Connector.toApi
);