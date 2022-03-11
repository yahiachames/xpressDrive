const mongoose = require("mongoose");
require("mongoose-type-email");
const RideSchema = new mongoose.Schema({
  cuurentPoint: { type: mongoose.Schema.Types.ObjectId, ref: "localizations" },
  destinationPoint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "localizations",
    required: true,
  },
  driver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  rider_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  total_price: { type: Number },
  ratio_per_km: { type: Number, required: true },
  distance_per_km: { type: Number, required: true },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "regions",
    required: true,
  },
  sub_region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sub_regions",
    required: true,
  },
  street: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "streets",
    required: true,
  },
  status: {
    type: String,
    rnum: ["pending , started , completed cancelled"],
  },
  timestamp_per_minute: {
    type: Number,
  },
  start_by_driver: {
    type: Boolean,
  },
  start_by_rider: {
    type: Boolean,
  },
  completed_by_driver: {
    type: Boolean,
  },
  completed_by_rider: {
    type: Boolean,
  },
  done: Boolean,
});

module.exports = mongoose.model("rides", RideSchema);
