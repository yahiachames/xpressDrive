const reduceObject = (object, eliminate) => {
  return Object.keys(object)
    .filter((key) => key !== eliminate)
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
};

// eliminate an element from object

module.exports = reduceObject;
