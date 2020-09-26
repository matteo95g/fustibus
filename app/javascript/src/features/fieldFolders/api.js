import Config from "Config";
import { getApiClient } from "@app/api";

const API_URL = Config.API_FULL_URL;

const urls = {
  find() {
    return `/field_folders/current`;
  },
};

export default {
  find() {
    const client = getApiClient(API_URL);
    return client.get(urls.find());
  },
};
