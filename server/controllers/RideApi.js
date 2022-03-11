const router = require("express").Router();
const Ride = require("../models/Ride");
const passport = require("passport");

router.get(
    "/one/:id",

    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Ride.findOne({ user: req.params.id }, (error, result) => {
            if (error) return next(err);
            if (result == null) res.send("no data");

            res.send(result);
        });
    }
);

router.get(
    "/all",

    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Ride.find({}, (error, result) => {
            if (error) return next(err);
            if (result == null) res.send("no data");

            res.send(result);
        });
    }
);

router.post(
    "/delete/:id",

    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Ride.findOneAndDelete({ user: req.params.id }, (error, result) => {
            if (error) return next(err);
            if (result == null) res.send("no data");

            res.status(200).json({
                success: true,
                message: "successfuly deleted",
            });
        });
    }
);

router.post(
    "/create",

    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const {
            currentPoint, destinationPoint, driver_id, rider_id,
            total_price, ratio_per_km, distance_per_km,
            region, sub_region, street, status, timestamp,
            start_by_driver, start_by_rider, completed_by_rider,
            completed_by_driver, done
        }

        const ride = new Ride({
            currentPoint,
            destinationPoint,
            driver_id, rider_id, total_price, ratio_per_km,
            distance_per_km,
            region, sub_region, street, status, timestamp,
            start_by_driver, start_by_rider, completed_by_driver
            , completed_by_rider

        })




        ride.save({}, (error, result) => {
            if (error) return next(err);
            if (result == null) res.send("no data");

            res.status(200).json({
                success: true,
                message: "successfuly created",
            });
        });
    }
);

router.post(
    "/update/:id",

    passport.authenticate("jwt", { session: false }),
    (req, res) => {

        Ride.findById(req.params.id, (err1, result1) => {
            if (err1) res.status(500).json({ success: false, msg: err1.kind })
            if (result1.length == 0) res.status(404).json({ success: false, msg: "no ride found" })
            else {


                const {
                    currentPoint, destinationPoint, driver_id, rider_id,
                    total_price, ratio_per_km, distance_per_km,
                    region, sub_region, street, status, timestamp,
                    start_by_driver, start_by_rider, completed_by_rider,
                    completed_by_driver, done
                }

                const ride = new Ride({
                    currentPoint : req.body.currentPoint? req.body.currentPoint:currentPoint,
                    destinationPoint : req.body.destinationPoint ? req.body.destinationPoint :destinationPoint,
                    driver_id: req.body.driver_id ? req.body.driver_id : driver_id,
                    rider_id : req.body.rider_id ? req.body.rider_id : rider_id,
                    total_price: req.body.total_price ? req.body.total_price : total_price,
                    ratio_per_km : req.body.ratio_per_km ? req.body.ratio_per_km : ratio_per_km,
                    distance_per_km : req.body.distance_per_km ? req.body.distance_per_km : distance_per_km,
                    region: req.body.region ? req.body.region : region, sub_region: req.body.sub_region ? req.body.sub_region : sub_region
                    , street: req.body.street ? req.body.street : street, status : req.body.status ? req.body.status : status
                    , timestamp : req.body.timestamp ? req.body.timestamp : timestamp,
                    start_by_driver: req.body.start_by_driver ? req.body.start_by_driver : start_by_driver
                    , start_by_rider: req.body.start_by_rider ? req.body.start_by_rider : start_by_rider,
                    completed_by_driver : req.body.completed_by_driver ? req.body.completed_by_driver : completed_by_driver
                    , completed_by_rider : req.body.completed_by_rider ? req.body.completed_by_rider : completed_by_rider
                    , done : req.body.done ? req.body.done : done

                })




                ride.save({}, (error, result) => {
                    if (error) return next(error);
                    if (result == null) res.send("no data");

                    res.status(200).json({
                        success: true,
                        message: "successfuly created",
                    });
                });


            }

        })
    }
);


module.exports = router;
