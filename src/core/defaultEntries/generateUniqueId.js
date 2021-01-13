const generateUniqueId = () => {
  const datetimeStr = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2);
  const id = `n-${datetimeStr}-${randomStr}`;
  return id;
};

export default generateUniqueId;
