const mongoose = require("mongoose");
require("mongoose-type-email");
const RegionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  localization: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "localizations",
      required: true,
    },
  ],
  code_postale: { type: Number, required: true },
});

module.exports = mongoose.model("regions", RegionSchema);
