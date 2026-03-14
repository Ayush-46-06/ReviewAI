const QRCode = require("qrcode");

exports.generateQR = async (link) => {

  const qr = await QRCode.toDataURL(link);

  return qr;
};