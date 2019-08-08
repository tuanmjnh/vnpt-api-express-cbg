const db = require('../services/oracle.js');

module.exports.getHDDT = async function (context) {
  let sql = `select THANG "thang",
    NAM "nam",
    CHUKY "chuky",
    TEN_TT "ten_tt",
    MS_THUE "ms_thue",
    DONVI_ID "donvi_id",
    DIACHI_TT "diachi_tt",
    SODAIDIEN "sodaidien",
    DIENTHOAI_LH "dienthoai_lh",
    MA_TT "ma_tt",
    CUOC_CTHUE "cuoc_cthue",
    CUOC_KTHUE "cuoc_kthue",
    TIEN_KM "tien_km",
    CKTM "cktm",
    HT_VTCI "ht_vtci",
    TIEN "tien",
    VAT "vat",
    TONG "tong",
    css_cbg.doisosangchu(TONG) "tong_chu",
    CANTRU "cantru",
    TONG_PT "tong_pt",
    MANV_TC "manv_tc",
    THANHTOAN_ID "thanhtoan_id",
    TUYENTHU "tuyenthu",
    MA_TT_NEO "ma_tt_neo",
    FKEY "fkey",
    HINHTHUC_TT "hinhthuc_tt",
    STT "stt",
    SERI "seri",
    KH_SERI "kh_seri",
    QRCODE "qrcode",
    PATTERN "pattern"
from bcss_cbg.hddt_${context.kyhoadon}`
  if (context.ma_tt && context.ma_tt.length > 0) {
    sql += ` where ma_tt in('${context.ma_tt.join('\',\'')}')`
  } else {
    sql += ' OFFSET 0 ROWS FETCH NEXT 1000 ROWS ONLY'
  }
  // console.log(context.ma_tt)
  const result = await db.execute(sql)
  return result.rows
};

module.exports.getTableHDDT = async function (context) {
  let sql = `SELECT table_name "name" FROM user_tables WHERE table_name like 'HDDT_%' ORDER BY table_name`
  const result = await db.execute(sql)
  return result.rows
};
module.exports.getHDDTDULIEU = async function (context) {
  let sql = `select THANG "thang",
    NAM "nam",
    CHUKY "chuky",
    TEN_TT "ten_tt",
    MS_THUE "ms_thue",
    DONVI_ID "donvi_id",
    DIACHI_TT "diachi_tt",
    SODAIDIEN "sodaidien",
    DIENTHOAI_LH "dienthoai_lh",
    MA_TT "ma_tt",
    CUOC_CTHUE "cuoc_cthue",
    CUOC_KTHUE "cuoc_kthue",
    TIEN_KM "tien_km",
    CKTM "cktm",
    HT_VTCI "ht_vtci",
    TIEN "tien",
    VAT "vat",
    TONG "tong",
    css_cbg.doisosangchu(TONG) "tong_chu",
    CANTRU "cantru",
    TONG_PT "tong_pt",
    MANV_TC "manv_tc",
    THANHTOAN_ID "thanhtoan_id",
    TUYENTHU "tuyenthu",
    MA_TT_NEO "ma_tt_neo",
    FKEY "fkey",
    HINHTHUC_TT "hinhthuc_tt",
    STT "stt",
    SERI "seri",
    KH_SERI "kh_seri",
    QRCODE "qrcode",
    PATTERN "pattern"
from dulieu_cbg.${context.table}`
  if (context.ma_tt && context.ma_tt.length > 0) {
    sql += ` where ma_tt in('${context.ma_tt.join('\',\'')}')`
  } // else {
    // sql += ' OFFSET 0 ROWS FETCH NEXT 1000 ROWS ONLY'
  // }
  // console.log(context.ma_tt)
  const result = await db.execute(sql)
  return result.rows
};