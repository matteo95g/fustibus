import Config from "Config";
import { getApiClient } from "@app/api";

const API_URL = Config.API_FULL_URL;

const urls = {
  collection(clubId) {
    return `/clubs/${clubId}/posters`;
  },

  resource(clubId) {
    return `/clubs/${clubId}/posters`;
  },
};

export default {
  find(clubId) {
    const client = getApiClient(API_URL);
    return client.get(urls.resource(clubId));
  },

  create(clubId, attributes = {}) {
    const client = getApiClient(API_URL);
    return client.post(urls.collection(clubId), attributes);
  },

  update(clubId, attributes = {}) {
    const client = getApiClient(API_URL);
    return client.put(urls.resource(clubId), attributes);
  },
};
