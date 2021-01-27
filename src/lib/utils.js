/**
 * Check if value is defined.
 *
 * @param {Object} value any value.
 * @returns {true|false}
 */
export const isDefined = (value) => value !== undefined;

/**
 * Check if value is empty.
 *
 * @param {Object} value any value.
 * @returns {true|false}
 */
export const isEmpty = (value) =>
  value === undefined || value === null || value === "";

/**
 * Check if value is array.
 *
 * @param {Array} value any value.
 * @returns {true|false}
 */
export const isArray = (value) => Array.isArray(value);

/**
 * Check if value is function.
 *
 * @param {Function} value any value.
 * @returns {true|false}
 */
export const isFunction = (obj) => typeof obj === "function";

/**
 * Check if value is Object.
 *
 * @param {Object} object any value.
 * @returns {true|false}
 */
export const isObject = (obj) => obj !== null && typeof obj === "object";

/**
 * Check if device is Mobile.
 *
 * @returns {true|false}
 */
export const isMobile = () => {
  return true;
};

/**
 * Check if object is Promise.
 *
 * @param {Object} object any value.
 * @returns {true|false}
 */
export const isPromise = (obj) => {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
};

/**
 * Get Unique Array.
 *
 * @param {Array} Array of objects.
 * @param {String} any object key to check unique.
 * @returns {Array} of Unique Elements
 */
export const getUniqueArray = (itemArr, itemKey) => {
  const uniqueFields = itemArr
    .map((item) => (isDefined(item[itemKey]) && item[itemKey]) || item)
    // store the indexes of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the false indexes & return unique objects
    .filter((e) => itemArr[e])
    .map((e) => itemArr[e]);

  return uniqueFields;
};

/**
 * Run function for any given times.
 *
 * @param {Integer} Count to run the loop.
 * @param {Function} Function which needs to be executed.
 * @returns {Array} Array of Iteratiosn
 */
export const times = (count, func) => {
  var i = 0,
    results = [];
  while (i < count) {
    results.push(func(i));
    i += 1;
  }
  return results;
};

/**
 * Converts a string path to a value that is existing in a json object.
 *
 * @param {Object} json Json data to use for searching the value.
 * @param {Object} path the path to use to find the value.
 * @returns {valueOfThePath|undefined}
 */
export const getValueFromJson = (json, path) => {
  if (!(json instanceof Object) || typeof path === "undefined") {
    if (process.env.NODE_ENV !== "production") {
      console.error("Not valid argument:json:" + json + ", path:" + path);
    }
    return;
  }
  path = path.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  path = path.replace(/^\./, ""); // strip a leading dot
  var pathArray = path.split(".");
  for (var i = 0, n = pathArray.length; i < n; ++i) {
    var key = pathArray[i];
    if (key in json) {
      if (json[key] !== undefined) {
        json = json[key];
      } else {
        return;
      }
    } else {
      return;
    }
  }
  return json;
};
