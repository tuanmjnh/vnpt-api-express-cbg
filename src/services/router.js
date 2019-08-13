const express = require('express');
const router = express.Router();
// Controller
const common = require('../controllers/common');
const filemanager = require('../controllers/filemanager');
const auth = require('../controllers/auth');
const hddt = require('../controllers/hddt');
// const employees = require('../controllers/employees.js');

// common
router.route('/common/exist').get(common.exist);
router.route('/common/generation-query').post(common.GenerationSelect);
router.route('/common/generation-model').post(common.GenerationModel);
router.route('/common/get-column').post(common.getColumn);
router.route('/transaction/list').get(common.transactionList);
router.route('/common/nhanvien').get(common.nhanvien);
// router.route('/common/get-user-from-token').get(common.getUserFromToken);
// router.route('/common/cursor').get(common.cursor)
// upload data
router
  .route('/filemanager/')
  .get(filemanager.get)
  .post(filemanager.upload, filemanager.post);

// auth
router
  .route('/auth/:id?')
  .get(auth.get)
  .post(auth.post);
// .put(auth.put)
// .delete(auth.delete);

// hddt
router.route('/hddt').post(hddt.getHDDT);
router.route('/hddt/table').get(hddt.getTableHDDT);
router.route('/hddt/dulieucbg').post(hddt.getHDDTDULIEU);

module.exports = router;
