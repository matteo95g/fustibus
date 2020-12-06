import Config from "Config";
import { getApiClient } from "@app/api";

const API_URL = Config.API_FULL_URL;

const urls = {
  collection() {
    return `/missions`;
  },
};

export default {
  list(attributes = {}) {
    const client = getApiClient(API_URL);
    return client.get(urls.collection(), {
      params: {
        ...attributes,
      },
    });
  },
};
