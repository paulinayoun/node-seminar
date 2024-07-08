const Account = require("../model/accountModel");

const asyncHandler = require("express-async-handler");

const checkUser = asyncHandler(async (req, res) => {
  try {
    if (req.query == undefined || req.query == "") {
      console.log("[check HeaderAll] no exist params");
      return res.json({
        code: 300,
      });
    }

    await Account.check_user(req.query.userId, function (result) {
      return res.json({
        code: 200,
        cnt: result[0].cnt,
      });
    });
  } catch (err) {
    console.log("Error check HeaderAll " + err);
    return res.json({
      code: 400,
    });
  }

  /* Account.check_user(req.query.userId, function (result) {
    res.json(result);
  }); */
});

const insertUser = asyncHandler(async (req, res) => {
  try {
    if (req.body == undefined || req.body == "") {
      console.log("[inserteHeaderAll] no exist params");
      return res.json({
        code: 300,
      });
    }
    let bodyData = req.body;
    await Account.insert_user(bodyData);
    return res.json({
      code: 200,
    });
  } catch (err) {
    console.log("Error insertHeaderAll " + err);
    return res.json({
      code: 400,
    });
  }
  /* Account.insert_user(
    req.body.userId,
    req.body.userNm,
    req.body.passwd,
    JSON.stringify(req.body.content),
    function (result) {
      res.json({ id: result });
    }
  ); */
});

module.exports = { checkUser, insertUser };
