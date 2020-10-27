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
  addRole(id) {
    return `/users/${id}/role`;
  },
  removeRole(id) {
    return `/users/${id}/role`;
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

  addRole(id, attributes = {}) {
    const client = getApiClient(API_URL);
    return client.post(urls.addRole(id), attributes);
  },

  removeRole(id, attributes = {}) {
    const client = getApiClient(API_URL);
    return client.delete(urls.removeRole(id), attributes);
  },
};
