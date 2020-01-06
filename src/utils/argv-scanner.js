const finder = (array, searchArray) => {
  const indexes = [];
  for (const searchValue of searchArray) {
    const result = array.indexOf(searchValue);

    if (result !== -1) {
      indexes.push(result);
    }
  }

  return indexes[0] === undefined ? false : indexes;
};

const argvScanner = () => {
  const query = {};
  let v = process.argv;
  v.splice(0, 2);
  if (!v[0]) {
    return query;
  }

  const noAdd = finder(v, ['-c', '--clean', '--no-add']);
  if (noAdd) {
    query.noAdd = true;
  }

  const noRemove = finder(v, ['--no-remove']);
  if (noRemove) {
    query.noRemove = true;
  }

  const noUpdateNowJson = finder(v, ['--no-update-now-json']);
  if (noUpdateNowJson) {
    query.noUpdateNowJson = true;
  }

  return query;
};

export default argvScanner;
