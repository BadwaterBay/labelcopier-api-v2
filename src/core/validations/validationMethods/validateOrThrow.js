const validateOrThrow = (item, getValidItems, ErrorClass) => {
  const validItems = getValidItems();
  const givenItemIsInvalid = !validItems.has(item);

  if (givenItemIsInvalid) {
    throw new ErrorClass(item);
  }

  return true;
};

export default validateOrThrow;
