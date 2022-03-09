const mongoose = require("mongoose");
require("mongoose-type-email");
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  email: { type: mongoose.SchemaTypes.Email, unique: true },
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ["driver", "rider"], required: true },
  full_name: { type: String },
  total_spend: { type: Number },
  rides: [{ type: mongoose.Schema.Types.ObjectId, ref: "rides" }],
  total_earnd: { type: Number },
  status: {
    type: Boolean,
  },
  rate: {
    type: Number,
  },
  points: {
    type: Number,
  },
});

module.exports = mongoose.model("User", UserSchema);
