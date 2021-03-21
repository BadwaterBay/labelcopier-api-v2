const generateUniqueId = () => {
  const datetimeStr = Date.now().toString(36);
  const randomStr0 = Math.random().toString(36).substring(2, 12);
  const randomStr1 = Math.random().toString(36).substring(2, 12);
  const id = `n-${datetimeStr}-${randomStr0}-${randomStr1}`;
  return id;
};

export default generateUniqueId;
