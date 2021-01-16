import Config from "Config";
import { getApiClient } from "@app/api";

const API_URL = Config.API_FULL_URL;

const urls = {
  collection(fieldFolderId) {
    return `/field_folders/${fieldFolderId}/entries`;
  },

  resource(fieldFolderId, id) {
    return `/field_folders/${fieldFolderId}/entries/${id}`;
  },
};

export default {
  create(fieldFolderId, attributes = {}) {
    const client = getApiClient(API_URL);
    return client.post(urls.collection(fieldFolderId), attributes);
  },

  list(fieldFolderId, attributes = {}) {
    const client = getApiClient(API_URL);
    return client.get(urls.collection(fieldFolderId), {
      params: {
        ...attributes,
      },
    });
  },

  destroy(fieldFolderId, id) {
    const client = getApiClient(API_URL);
    return client.delete(urls.resource(fieldFolderId, id));
  },

  find(fieldFolderId, id) {
    const client = getApiClient(API_URL);
    return client.get(urls.resource(fieldFolderId, id));
  },

  update(fieldFolderId, id, attributes) {
    const client = getApiClient(API_URL);
    return client.put(urls.resource(fieldFolderId, id), attributes);
  },
};
