var express = require("express");
var router = express.Router();
require("dotenv").config();
const axios = require("axios");
const background = process.env.BACKGROUND_COLOR;

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  params: {},
  timeout: process.env.TIMEOUT || 15000,
});

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    console.log("Sending request to backend albums api");
    console.log("배포 잘되는지 test github");
    var data = await api.get("/albums");
    console.log("Response from backend albums api: ", data.data);
    res.render("index", {
      albums: data.data,
      background_color: background,
    });
  } catch (err) {
    console.log("Error: ", err);
    next(err);
  }
});

/* 웹화면에 process.env.vaulttest 를 찍어라 , 웹페이지에서 보이도록 찍으라 */
router.get("/vaulttest", function (req, res) {
  res.send(process.env.vaulttest);
});
console.log("vaulttest", process.env.vaulttest);

module.exports = router;
