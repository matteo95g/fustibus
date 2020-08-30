import Config from "Config";
import { getApiClient } from "@app/api";

const API_URL = Config.API_FULL_URL;

const urls = {
  collection() {
    return "/posters";
  },

  resource(id) {
    return `/posters/${id}`;
  },
};

export default {
  list(options = {}) {
    const client = getApiClient(API_URL);
    return client.get(urls.collection(), {
      params: {
        ...options,
      },
    });
  },

  find(id) {
    const client = getApiClient(API_URL);
    return client.get(urls.resource(id));
  },

  create(attributes = {}) {
    const client = getApiClient(API_URL);
    return client.post(urls.collection(), attributes);
  },

  update(id, attributes = {}) {
    const client = getApiClient(API_URL);
    return client.put(urls.resource(id), attributes);
  },

  destroy(id) {
    const client = getApiClient(API_URL);
    return client.delete(urls.resource(id));
  },
};
