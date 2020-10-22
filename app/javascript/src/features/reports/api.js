import Config from "Config";
import { getApiClient } from "@app/api";

const API_URL = Config.API_FULL_URL;

const urls = {
  current() {
    return `/report/current`;
  },

  resource() {
    return `/report`;
  },
};

export default {
  find() {
    const client = getApiClient(API_URL);
    return client.get(urls.current());
  },

  update(attributes = {}) {
    const client = getApiClient(API_URL);
    return client.put(urls.resource(), attributes);
  },
};
