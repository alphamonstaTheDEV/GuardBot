const mongoose = require("mongoose");
//          [--Schemes--]
const infSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverID: String,
    userID: String,
    action: String,
    reason: String,
    moderator: String,
    date: String,
    infID: Number
})
module.exports.Inf = mongoose.model("inf", infSchema);

//          [--DatabaseStuff--]

