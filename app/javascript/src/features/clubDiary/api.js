import Config from "Config";
import { getApiClient } from "@app/api";

const API_URL = Config.API_FULL_URL;

const urls = {
  collection() {
    return `/missions`;
  },

  resource(id) {
    return `/missions/${id}`;
  },
};

export default {
  listMissions(attributes = {}) {
    const client = getApiClient(API_URL);
    return client.get(urls.collection(), {
      params: {
        ...attributes,
      },
    });
  },

  create(attributes = {}) {
    const client = getApiClient(API_URL);
    return client.post(urls.collection(), attributes);
  },

  update(id, attributes = {}) {
    const client = getApiClient(API_URL);
    return client.put(urls.resource(id), attributes);
  },

  delete(id) {
    const client = getApiClient(API_URL);
    return client.delete(urls.resource(id));
  },
};
