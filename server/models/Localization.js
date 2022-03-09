const mongoose = require("mongoose");
require("mongoose-type-email");
const RiderSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("localizations", RiderSchema);
