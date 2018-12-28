const mongoose = require("mongoose");
//          [--Schemes--]
const infSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ServerID: String,
    UserID: String,
    Action: String,
    Reason: String,
    Moderator: String,
    Date: String,
    ID: Number
})
module.exports.Inf = mongoose.model("inf", infSchema);

//          [--DatabaseStuff--]

