import { template } from 'lodash';

export async function tryRequest(request, dataMapper = data => data) {
  try {
    const response = await request();
    const data = dataMapper(response.data);

    return {
      success: true,
      data
    };
  }
  catch (error) {
    /* eslint-disable-next-line no-console */
    console.error('API error', error);

    return {
      success: false,
      error
    };
  }
}

export function compilePath(path) {
  return template(path, {
    interpolate: /{{([\s\S]+?)}}/g
  });
}