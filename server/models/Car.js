const mongoose = require("mongoose");
require("mongoose-type-email");
const CarSchema = new mongoose.Schema({
  type: { type: String, enum: ["sedan", "commercial", "citadine"] },
  photo: { type: Buffer, required: true },
  chv: { type: Number, required: true },
  marque: { type: String, required: true },
  serial_number: { type: String, required: true },
  air_conditioner: { type: Boolean, required: true },
  heating: { type: Boolean, required: true },
  vignettes: { type: Buffer, required: true },
  assurance: { type: Buffer, required: true },
  visite: { type: Buffer, required: true },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  cin: { type: Buffer, required: true },
  permis: { type: Buffer, required: true },
  rider_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  level: { type: String, enum: ["normal", "confort"] },
});

module.exports = mongoose.model("documents", CarSchema);
