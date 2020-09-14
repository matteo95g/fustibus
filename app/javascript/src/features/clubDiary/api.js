import Config from "Config";
import { getApiClient } from "@app/api";

const API_URL = Config.API_FULL_URL;

const urls = {
  collection(id) {
    return `/clubs/${id}/missions`;
  },
};

export default {
  listMissions(clubId, attributes = {}) {
    const client = getApiClient(API_URL);
    return client.get(urls.collection(clubId), {
      params: {
        ...attributes,
      },
    });
  },
};
