const mongoose = require("mongoose");
//          [--Schemes--]
const infScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ServerID: String,
    UserID: String,
    Action: String,
    Reason: String,
    Moderator: String,
    Date: String,
    ID: Number
})
module.exports.Inf = mongoose.model("inf", infScheme);

//          [--DatabaseStuff--]

