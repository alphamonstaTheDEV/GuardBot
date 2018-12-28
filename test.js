const mongoose = require("mongoose");
const schemes = require("./utils/schemas.js");
const uri = "mongodb+srv://guard-bot:ifwhdArn09XCFst8@cancluster01-nalpc.mongodb.net/GuardBot";
mongoose.connect(uri, {useNewUrlParser: true})

// const warn = new schemes.Inf({
//     _id: mongoose.Types.ObjectId(),
//     ServerID: "String",
//     UserID: "String",
//     Action: "String",
//     Reason: "String",
//     Moderator: "String",
//     Date: "String",
//     ID: 0001
// })

// warn.save().then(result => {console.log(result);
// })

schemes.Inf.find({ UserID: "233694944047529996" }, (err, res) => {
    console.log(res);

})