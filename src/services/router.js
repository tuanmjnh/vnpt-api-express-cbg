const express = require('express');
const router = express.Router();
// Controller
const common = require('../controllers/common');
const filemanager = require('../controllers/filemanager');
const auth = require('../controllers/auth');
const qrcode = require('../controllers/qrcode');
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

// QRCode
router.route('/qrcode').post(qrcode.getHDDT);

module.exports = router;
