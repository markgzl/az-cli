function formateKey(key = "") {
  return key.replace(/-/g, "");
}

function formatCreateArgv() {
  let [name, ...rest] = process.argv.slice(3);
  let options = {};
  if (rest) {
    rest.forEach((item) => {
      options[formateKey(item)] = item;
    });
  }
  return {
    name,
    options,
  };
}

module.exports = {
  formatCreateArgv,
};
