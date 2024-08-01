const Bin = require("../models/Bin");
const appError = require("../utiles/errors");
const status = require("../utiles/status");
const multer = require('multer');
const QrCode = require('qrcode-reader');
const Jimp = require('jimp');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('QR');

const verifyQRCode = (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            const error = appError.create("QR Code upload failed", 400, status.FAIL);
            return next(error);
        }

        const qrCodeImageBuffer = req.file.buffer;
        console.log(qrCodeImageBuffer);
        Jimp.read(qrCodeImageBuffer, (err, image) => {
            if (err) {
                const error = appError.create("Failed to read QR Code image", 400, status.FAIL);
                return next(error);
            }

            const qr = new QrCode();
            qr.callback = async (err, value) => {
                if (err) {
                    const error = appError.create("Failed to decode QR Code", 400, status.FAIL);
                    return next(error);
                }

                const binIdFromQRCode = value.result.replace('binId:', '');
                console.log(binIdFromQRCode);
                const bin = await Bin.findById(binIdFromQRCode);
                if (!bin) {
                    const error = appError.create("Invalid QR Code", 400, status.FAIL);
                    return next(error);
                }

                req.bin = bin;
                next();
            };

            qr.decode(image.bitmap);
        });
    });
};

module.exports = verifyQRCode;