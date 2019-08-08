module.exports = {
  dulieucbg: {
    // poolAlias: 'dulieubkn',
    user: "DULIEU_CBG",
    password: "vnpt123",
    connectString: "exax7q-scan.vnpthcm.vn/CAOBANG",
    poolMin: 1, // let the pool shrink completely
    poolMax: 10, // maximum size of the pool
    poolIncrement: 1, // only grow the pool by one connection at a time
    // poolTimeout: 0, // never terminate idle connections
    externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
  },
  // Knex
  dulieucbg_knex: {
    host: "exax7q-scan.vnpthcm.vn",
    user: "DULIEU_CBG",
    password: "vnpt123",
    database: 'CAOBANG',
    pool: { min: 0, max: 1 }
  }
};
