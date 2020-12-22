import Config from "Config";
import { getApiClient } from "@app/api";

const API_URL = Config.API_FULL_URL;

const urls = {
  collection() {
    return `/notes`;
  },

  resource(id) {
    return `/notes/${id}`;
  },
};

export default {
  create(attributes = {}) {
    const client = getApiClient(API_URL);
    return client.post(urls.collection(), attributes);
  },

  list(attributes = {}) {
    const client = getApiClient(API_URL);
    return client.get(urls.collection(), {
      params: {
        ...attributes,
      },
    });
  },

  find(id) {
    const client = getApiClient(API_URL);
    return client.get(urls.resource(id));
  },

  destroy(id) {
    const client = getApiClient(API_URL);
    return client.delete(urls.resource(id));
  },

  update(id, attributes) {
    const client = getApiClient(API_URL);
    return client.put(urls.resource(id), attributes);
  },
};
