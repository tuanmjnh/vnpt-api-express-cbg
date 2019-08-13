const dbapi = require("../db_apis/hddt");
const helpers = require("../util/helpers");

module.exports.getHDDT = async function(req, res, next) {
  try {
    // check req data
    if (!req.body.kyhoadon) {
      res.status(404).json({ msg: 'exist', params: 'kydoadon' });
    }
    req.body.kyhoadon = helpers.ToDate(req.body.kyhoadon, 'YYYYMM01')
    // console.log(req.query)
    const result = await dbapi.getHDDT(req.body);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ msg: 'exist', params: 'data' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getTableHDDT = async function(req, res, next) {
  try {
    if (!req.query || !req.query.table) {
      req.query.table = 'HDDT_'
    }
    const result = await dbapi.getTableHDDT(req.query);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ msg: 'exist', params: 'data' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getHDDTDULIEU = async function(req, res, next) {
  try {
    // check req data
    if (!req.body.table) {
      res.status(404).json({ msg: 'exist', params: 'table' });
    }
    const result = await dbapi.getHDDTDULIEU(req.body);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ msg: 'exist', params: 'data' });
    }
  } catch (err) {
    next(err);
  }
};
