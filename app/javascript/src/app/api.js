import axios from "axios";
import humps from "humps";

// import Raven from 'raven-js';
// import store from '../store/index';

/**
 * Use this to generate a new ApiClient instance.
 * This is the public interface to getting an API Client
 *
 * Anytime you want to make an API call, create a fresh instance using this, do not cache a client.
 *
 * GOOD
 *
 * someFunc() {
 *    const client = getApiClient(API_URL)
 *    return client.post(urls.collection(), attributes);
 * }
 *
 *
 * BAD
 *
 * const client = getClient(API_URL); // cached outside of calling method.
 * someFunc() {
 *    return client.post(urls.collection(), attributes);
 * }
 *
 */

const getMetaContent = (name) => {
  var metas = document.getElementsByTagName("meta");

  for (var i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("name") == name) {
      return metas[i].getAttribute("content");
    }
  }
};
const getApiClient = (apiBaseUrl) => {
  return new ApiClient(apiBaseUrl);
};

/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const getClient = (baseUrl = null) => {
  const options = {
    baseURL: baseUrl,
  };

  const client = axios.create(options);

  // // Add a request interceptor
  // client.interceptors.request.use(
  //   requestConfig => requestConfig,
  //   (requestError) => {
  //     Raven.captureException(requestError);

  //     return Promise.reject(requestError);
  //   },
  // );

  // // Add a response interceptor
  // client.interceptors.response.use(
  //   response => response,
  //   (error) => {
  //     if (error.response.status >= 500) {
  //       Raven.captureException(error);
  //     }

  //     return Promise.reject(error.response);
  //   },
  // );

  return client;
};

class ApiClient {
  constructor(baseUrl = null) {
    this.client = getClient(baseUrl);
  }

  get(url, conf = {}) {
    conf = humps.decamelizeKeys(conf, { split: /(?=[A-Z0-9])/ });
    return this.client
      .get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => {
        return Promise.reject(error.response);
      });
  }

  delete(url, data = {}, headers = {}) {
    data = humps.decamelizeKeys(data, { split: /(?=[A-Z0-9])/ });
    data.authenticity_token = getMetaContent("csrf-token");
    return this.client
      .delete(url, { data, headers })
      .then((response) => Promise.resolve(response))
      .catch((error) => {
        return Promise.reject(error.response);
      });
  }

  head(url, conf = {}) {
    conf = humps.decamelizeKeys(conf, { split: /(?=[A-Z0-9])/ });
    return this.client
      .head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => {
        return Promise.reject(error.response);
      });
  }

  options(url, conf = {}) {
    conf = humps.decamelizeKeys(conf, { split: /(?=[A-Z0-9])/ });
    return this.client
      .options(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => {
        return Promise.reject(error.response);
      });
  }

  post(url, data = {}, conf = {}) {
    data = humps.decamelizeKeys(data, { split: /(?=[A-Z0-9])/ });
    conf = humps.decamelizeKeys(conf, { split: /(?=[A-Z0-9])/ });
    data.authenticity_token = getMetaContent("csrf-token");
    return this.client
      .post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => {
        return Promise.reject(error.response);
      });
  }

  put(url, data = {}, conf = {}) {
    data = humps.decamelizeKeys(data, { split: /(?=[A-Z0-9])/ });
    conf = humps.decamelizeKeys(conf, { split: /(?=[A-Z0-9])/ });
    data.authenticity_token = getMetaContent("csrf-token");
    return this.client
      .put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => {
        return Promise.reject(error.response);
      });
  }

  patch(url, data = {}, conf = {}) {
    data = humps.decamelizeKeys(data, { split: /(?=[A-Z0-9])/ });
    conf = humps.decamelizeKeys(conf, { split: /(?=[A-Z0-9])/ });
    data.authenticity_token = getMetaContent("csrf-token");
    return this.client
      .patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => {
        return Promise.reject(error.response);
      });
  }
}

export { ApiClient, getApiClient };

/**
 * Base HTTP Client
 */
export default {
  // Provide request methods with the default base_url
  get(url, conf = {}) {
    return getClient()
      .get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error.response));
  },

  delete(url, conf = {}) {
    return getClient()
      .delete(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error.response));
  },

  head(url, conf = {}) {
    return getClient()
      .head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error.response));
  },

  options(url, conf = {}) {
    return getClient()
      .options(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error.response));
  },

  post(url, data = {}, conf = {}) {
    return getClient()
      .post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error.response));
  },

  put(url, data = {}, conf = {}) {
    return getClient()
      .put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error.response));
  },

  patch(url, data = {}, conf = {}) {
    return getClient()
      .patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error.response));
  },
};
