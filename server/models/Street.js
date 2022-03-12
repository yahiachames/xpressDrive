const mongoose = require("mongoose");
require("mongoose-type-email");
const StreetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  localization: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "localizations",
      required: true,
    },
  ],
  code_postale: { type: Number, required: true },
  street_number: { type: String, required: true },
});

module.exports = mongoose.model("streets", StreetSchema);
