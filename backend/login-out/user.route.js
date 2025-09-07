const express = require("express");
const { loginUser, logoutUser, refreshToken } = require("./user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/login")
  .get((req, res, next) => {
    res.set({ Allow: "POST, GET" });
    res.status(405).send({ Allow: "POST, GET" });
  })
  .put((req, res, next) => {
    res.set({ Allow: "POST, GET" });
    res.status(405).send({ Allow: "POST, GET" });
  })
  .patch((req, res, next) => {
    res.set({ Allow: "POST, GET" });
    res.status(405).send({ Allow: "POST, GET" });
  })
  .post(loginUser)
  .delete((req, res, next) => {
    res.set({ Allow: "POST, GET" });
    res.status(405).send({ Allow: "POST, GET" });
  });

router
  .route("/logout")
  .get((req, res, next) => {
    res.set({ Allow: "POST, GET" });
    res.status(405).send({ Allow: "POST, GET" });
  })
  .put((req, res, next) => {
    res.set({ Allow: "POST, GET" });
    res.status(405).send({ Allow: "POST, GET" });
  })
  .patch((req, res, next) => {
    res.set({ Allow: "POST, GET" });
    res.status(405).send({ Allow: "POST, GET" });
  })
  .post(logoutUser)
  .delete((req, res, next) => {
    res.set({ Allow: "POST, GET" });
    res.status(405).send({ Allow: "POST, GET" });
  });

router
  .route("/refresh-token")
  .get((req, res, next) => {
    res.set({ Allow: "POST, GET" });
    res.status(405).send({ Allow: "POST, GET" });
  })
  .put((req, res, next) => {
    res.set({ Allow: "POST, GET" });
    res.status(405).send({ Allow: "POST, GET" });
  })
  .patch((req, res, next) => {
    res.set({ Allow: "POST, GET" });
    res.status(405).send({ Allow: "POST, GET" });
  })
  .post(refreshToken)
  .delete((req, res, next) => {
    res.set({ Allow: "POST, GET" });
    res.status(405).send({ Allow: "POST, GET" });
  });

module.exports = router;
