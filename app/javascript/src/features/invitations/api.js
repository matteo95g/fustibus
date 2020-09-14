import Config from "Config";
import { getApiClient } from "@app/api";

const API_URL = Config.API_FULL_URL;

const urls = {
  accept(id) {
    return `invitations/${id}/accept`;
  },
  reject(id) {
    return `invitations/${id}/reject`;
  },
};

export default {
  accept(id) {
    const client = getApiClient(API_URL);
    return client.post(urls.accept(id));
  },

  reject(id) {
    const client = getApiClient(API_URL);
    return client.post(urls.reject(id));
  },
};
