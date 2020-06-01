'use strict'

const defaultConfig = {
  username: "bgxtnrjb",
  host: "satao.db.elephantsql.com",
  password: "HVnv0K00jTT94BKDBBOrC6DfeNHE8-Mi",
  database: "bgxtnrjb",
  dialect: "postgres"
};

const baseConfig = defaultConfig

module.exports = {
  development: baseConfig,
  test: baseConfig,
};
