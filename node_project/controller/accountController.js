const express = require("express");
const router = express.Router();
// const {
//   checkUser,
//   insertUser,
// } = require("../controllers/newAccountController"); => AccountService에서 처리

const AccountService = require("../service/accountService");

// router.route("/").get(checkUser).post(insertUser);

router.get("", async function (req, res) {
  try {
    return AccountService.checkUser(req, res);
  } catch (err) {
    logger.info(JSON.stringify(err, null, 2));
    return res.json({
      code: 400,
    });
  }
});

router.post("/add", async function (req, res) {
  try {
    // insertUser
    return AccountService.insertUser(req, res);
  } catch (err) {
    logger.info(JSON.stringify(err, null, 2));
    return res.json({
      code: 400,
    });
  }
});

module.exports = router;
