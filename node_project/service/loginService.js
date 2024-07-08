const login = require("../model/loginModel");

const asyncHandler = require("express-async-handler");

const lookup = asyncHandler(async (req, res) => {
  try {
    if (req.body === undefined || req.body === "") {
      console.log("[checkHeaderAll] no exist params");
      return res.json({
        code: 300,
      });
    }

    let bodyData = req.body;

    await login.get_user(bodyData, function (result) {
      return res.json({
        code: 200,
        cnt: result[0].cnt,
      });
      //res.json(result);
    });
  } catch (err) {
    console.log("Error checkHeaderAll " + err);
    return res.json({
      code: 400,
    });
  }
});

module.exports = { lookup };
