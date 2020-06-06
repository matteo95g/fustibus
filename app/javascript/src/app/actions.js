const standardAction = (type, payload = {}, meta = {}) => {
  const isError = (obj) => obj instanceof Error;
  const action = { type, payload, meta };

  return isError(payload) ? { ...action, error: true } : action;
};

const apiAction = (type, promise, meta = {}) => ({ type, promise, meta });

export { standardAction, apiAction };
