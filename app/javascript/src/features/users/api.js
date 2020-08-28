import Config from "Config";
import { getApiClient } from "@app/api";

const API_URL = Config.API_FULL_URL;

const urls = {
  login() {
    return "/login";
  },
  signup() {
    return "/signup";
  },
  logout() {
    return "/logout";
  },
  resource(id) {
    return `/users/${id}`;
  },
};

export default {
  login(attributes = {}) {
    const client = getApiClient(API_URL);
    return client.post(urls.login(), attributes);
  },

  logout() {
    const client = getApiClient(API_URL);
    return client.delete(urls.logout());
  },

  signup(attributes = {}) {
    const client = getApiClient(API_URL);
    return client.post(urls.signup(), attributes);
  },

  update(id, attributes = {}) {
    const client = getApiClient(API_URL);
    return client.put(urls.resource(id), attributes);
  },
};
