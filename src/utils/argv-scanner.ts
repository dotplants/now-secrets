const finder = (array: Array<string>, searchArray: Array<string>) => {
  const indexes = [];
  for (const searchValue of searchArray) {
    const result = array.indexOf(searchValue);

    if (result !== -1) {
      indexes.push(result);
    }
  }

  return indexes[0] === undefined ? false : indexes;
};

type returnTypes = {
  noAdd?: boolean;
  noRemove?: boolean;
  noUpdateNowJson?: boolean;
};

const argvScanner = (): returnTypes => {
  const query: returnTypes = {};
  const v: Array<string> = process.argv;
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

  const noUpdateNowJson = finder(v, [
    '--no-update-now-json',
    '--no-update-vercel-json'
  ]);
  if (noUpdateNowJson) {
    query.noUpdateNowJson = true;
  }

  return query;
};

export default argvScanner;
