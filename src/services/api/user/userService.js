import { User } from '../../../classes/user';
import { CrudService } from '../crudService';

export const userService = new CrudService(
  'https://reqres.in/api/login',
  User.fromApi,
  User.toApi
);