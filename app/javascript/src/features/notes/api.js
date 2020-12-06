import Config from "Config";
import { getApiClient } from "@app/api";

const API_URL = Config.API_FULL_URL;

const urls = {
  collection() {
    return `/notes`;
  },

  // resource(noteId, id) {
  //   return `/notes/${noteId}/note_sections/${id}`;
  // },
};

export default {
  create(attributes = {}) {
    const client = getApiClient(API_URL);
    return client.post(urls.collection(), attributes);
  },

  // list(noteId, attributes = {}) {
  //   const client = getApiClient(API_URL);
  //   return client.get(urls.collection(noteId), {
  //     params: {
  //       ...attributes,
  //     },
  //   });
  // },

  // destroy(noteId, id) {
  //   const client = getApiClient(API_URL);
  //   return client.delete(urls.resource(noteId, id));
  // },

  // update(noteId, id, attributes) {
  //   const client = getApiClient(API_URL);
  //   return client.put(urls.resource(noteId, id), attributes);
  // },
};
