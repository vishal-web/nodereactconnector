const isEmpty = value => 
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);


const ucFirst = (str) => {
    return str.substr(0,1).toUpperCase() + str.slice(1);
}


module.exports = {
    ucFirst,
    isEmpty
}
