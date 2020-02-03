const { basename, extname } = require("path");
const { readJson } = require("fs-extra");
const yaml = require("js-yaml");

const { getPaths, asyncReadFile } = require("./io-helper");

const JSON_EXTENSION = ".json";

const loadData = async data => {
  const dataPool = {};
  const dataPaths = await getPaths(data);
  await Promise.all(dataPaths.map(async path => {
    const ext = extname(path);
    const filename = basename(path, ext);

    try {
      const curData = ext === JSON_EXTENSION ? await readJson(path) : yaml.safeLoad(await asyncReadFile(path));
      dataPool[filename] = curData;
    }
    catch(err) {
      console.error("Failed to parse ", path);
      throw err;
    }

  }));
  return dataPool;
};

module.exports = {
  loadData,
};