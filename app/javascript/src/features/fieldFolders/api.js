import Config from "Config";
import { getApiClient } from "@app/api";

const API_URL = Config.API_FULL_URL;

const urls = {
  resource(id) {
    return `/field_folders/${id}`;
  },
};

export default {
  find(id) {
    const client = getApiClient(API_URL);
    return client.get(urls.resource(id));
  },
};
