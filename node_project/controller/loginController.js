const express = require("express");
//const { selectContact } = require("../service/loginService");

const loginService = require("../service/loginService");

const router = express.Router();

//router.route("/").post(selectContact);

router.post("", async function (req, res) {
  try {
    return loginService.lookup(req, res);
  } catch (err) {
    logger.info(JSON.stringify(err, null, 2));
    return res.json({
      code: 400,
    });
  }
});
module.exports = router;
