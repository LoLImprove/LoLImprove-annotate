var HelpersUtils = {}

// TODO: Extract
HelpersUtils.isString = function(string) {
  if (typeof string === "string") {
    return true;
  } else {
    return false;
    //  throw "Trying to use string method on " + (typeof string);
  }
}


export default HelpersUtils;
