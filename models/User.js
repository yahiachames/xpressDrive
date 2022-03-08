const mongoose = require("mongoose");
require("mongoose-type-email");
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  email: { type: mongoose.SchemaTypes.Email },
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "driver", "rider"] },
});

module.exports = mongoose.model("User", UserSchema);
