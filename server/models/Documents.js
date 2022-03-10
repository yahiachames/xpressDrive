const mongoose = require("mongoose");
require("mongoose-type-email");
const DocumentSchema = new mongoose.Schema({
  photo: { type: Buffer, required: true },
  cin: { type: Buffer, required: true },
  permis: { type: Buffer, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("documents", DocumentSchema);
