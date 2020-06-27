import Config from "Config";
import { getApiClient } from "@app/api";

const API_URL = Config.API_FULL_URL;

const urls = {
  collection(fieldFolderId) {
    return `/field_folders/${fieldFolderId}/entries`;
  },
};

export default {
  create(fieldFolderId, attributes = {}) {
    const client = getApiClient(API_URL);
    return client.post(urls.collection(fieldFolderId), attributes);
  },

  list(fieldFolderId, attributes = {}) {
    const client = getApiClient(API_URL);
    return client.get(urls.collection(fieldFolderId), attributes);
  },
};
