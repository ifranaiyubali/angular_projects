const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");
  const authenticate = require('../authenticate');

const Promotions = require('../models/promotions');


const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter
  .route("/")
  .get((req, res, next) => {
    Promotions.find({})
    .then(
      (promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
  })

  .post(authenticate.verifyUser,(req, res, next) => {
    Promotions.create(req.body)
      .then(
        (promotion) => {
          console.log("Promotion Created ", JSON.stringify(promotion));
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promotion);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .put(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })

  .delete((req, res, next) => {
    Promotions.remove({})
    .then(
      (resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
  });

promoRouter
  .route("/:promoid")
  .get((req, res, next) => {
    Promotions.findById(req.params.promoid)
    .then(
      (promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
  })

  .post(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/ ${req.params.promoid}`);
  })

  .put((req, res, next) => {
    Promotions.findByIdAndUpdate(
      req.params.promoid,
      {
        $set: req.body,
      },
      { new: true }
    )
    .then(
        (promotion) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promotion);
        },
        (err) => next(err)
    )
    .catch((err) => next(err));
  })

  .delete(authenticate.verifyUser,(req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoid)
    .then(
      (resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
  });

module.exports = promoRouter;
