const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        binId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bin', required: true },
        cans: { type: Number, default: 0 },
        bigBottle: { type: Number, default: 0 },
        smallBottle: { type: Number, default: 0 },
        points: { type: Number, default: 0 }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
