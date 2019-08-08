const oracledb = require('oracledb');
const oracleConfig = require('../config/oracle');
// const Cursor = require('./oracle-cursor');
//
// oracledb.maxRows = 10000;
//
// Static connection
// let connection;
async function initialize() {
  await oracledb.createPool(oracleConfig.dulieucbg);
  // const pool = await oracledb.createPool(oracleConfig.dulieubkn);
  // connection = await pool.getConnection();
  // , function (err, pool) {
  // console.log(pool); // default
  // }
}
module.exports.initialize = initialize;

async function closePool() {
  try {
    await oracledb.getPool().close();
  } catch (error) {
    console.log(error)
  }
}
module.exports.closePool = closePool;

// function close() {
//   if (connection) connection.close();
// }
// module.exports.close = close;

function execute(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;
    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;
    try {
      conn = await oracledb.getConnection();
      const result = await conn.execute(statement, binds, opts);
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) {
        // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}
module.exports.execute = execute;

function executeMany(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;
    opts.batchErrors = true;

    try {
      conn = await oracledb.getConnection();

      const result = await conn.executeMany(statement, binds, opts);

      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) {
        // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}
module.exports.executeMany = executeMany;

function executeCursor(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;
    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;
    // opts.resultSet = true;
    binds.cursor = { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    // // add cursor to query
    // statement = `${statement.trim().substr(0, statement.length - 1)},:cursor)`;
    // // build query
    // statement = ` ${statement}; END;`;
    let sql = '';
    Object.keys(binds).forEach(e => {
      sql += `:${e},`;
    })
    sql = `BEGIN\n${statement}(${sql.substr(0, sql.length - 1)});\nEND;`;
    try {
      conn = await oracledb.getConnection();
      const result = await conn.execute(sql, binds, opts);
      result.outBinds.cursor.getRow().then((rs) => {
        resolve(rs);
        conn.close();
      })
    } catch (err) {
      reject(err);
    } finally { }
  });
}
module.exports.executeCursor = executeCursor;

function executeCursors(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    opts.outFormat = oracledb.OBJECT;
    binds.cursor = { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    // oracledb.fetchAsString = [oracledb.CLOB];
    let conn;
    let sql = '';
    Object.keys(binds).forEach(e => { sql += `:${e},`; })
    sql = `BEGIN\n${statement}(${sql.substr(0, sql.length - 1)});\nEND;`;
    try {
      conn = await oracledb.getConnection();
      const result = await conn.execute(sql, binds, opts);
      let rows = [];
      let row;
      while ((row = await result.outBinds.cursor.getRow())) {
        rows.push(row);
      }
      resolve(rows);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  });
}
module.exports.executeCursors = executeCursors;

function GetOutBinds(result) {
  let rs = {}
  Object.keys(result.outBinds).forEach(e => {
    rs[e.toLowerCase()] = result.outBinds[e] !== undefined && result.outBinds[e].length > 0 ? result.outBinds[e][0] : null
  });
  return rs;
}
module.exports.GetOutBinds = GetOutBinds;

async function fetchRowsFromRS(connection, resultSet, numRows) {
  return resultSet.getRows( // get numRows rows
    numRows,
    function (err, rows) {
      if (err) {
        console.log(err);
        doClose(connection, resultSet); // always close the ResultSet
      } else if (rows.length === 0) { // no rows, or no more rows
        doClose(connection, resultSet); // always close the ResultSet
      } else if (rows.length > 0) {
        console.log("fetchRowsFromRS(): Got " + rows.length + " rows");
        console.log(rows);
        fetchRowsFromRS(connection, resultSet, numRows);
      }
    });
}
module.exports.fetchRowsFromRS = fetchRowsFromRS;

function doRelease(connection) {
  connection.close(
    function (err) {
      if (err) { console.error(err.message); }
    });
}
module.exports.doRelease = doRelease;

function doClose(connection, resultSet) {
  resultSet.close(
    function (err) {
      if (err) { console.error(err.message); }
      doRelease(connection);
    });
}
module.exports.doClose = doClose;

// knex
// const knex = require('knex')({
//   client: 'oracledb',
//   connection: {
//     host: oracleConfig.dulieubkn_knex.host,
//     user: oracleConfig.dulieubkn_knex.user,
//     password: oracleConfig.dulieubkn_knex.password,
//     database: oracleConfig.dulieubkn_knex.database
//   },
//   pool: oracleConfig.dulieubkn_knex.pool
// });

// var knex = require('knex')({
//   client: 'oracledb',
//   connection: {
//     user: 'DULIEU_BKN',
//     password: 'vnpt123',
//     database: 'BACKAN',
//     host: '10.70.53.40'
//   }
// });
// knex
//   .raw('select * from ttkd_bkn.kehoach_th')
//   .then(data => console.log(JSON.stringify(data)))
//   .catch(err => console.log(err));

// knex.destroy();

// module.exports.knex = knex;
