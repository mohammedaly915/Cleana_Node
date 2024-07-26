const qrCode = require('qrcode-reader');
const Jimp = require('jimp');

const validateQRCode = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'QR code image is required' });
    }

    const buffer = req.file.buffer;

    try {
        const image = await Jimp.read(buffer);
        const qr = new qrCode();
        qr.callback = (err, value) => {
            if (err) {
                return res.status(400).json({ message: 'Invalid QR code' });
            }
            req.qrCodeData = value.result;
            return res.status(200).json({ data:req.qrCodeData });
            //next();
        };
        qr.decode(image.bitmap);
    } catch (error) {
        return res.status(400).json({ message: 'Error processing QR code' });
    }
};

module.exports = validateQRCode;
