// Get All Contact

// Get /contact

const Contact = require("../model/contactModel");
const path = require("path");

const asyncHandler = require("express-async-handler");

const getAllContacts = asyncHandler(async (req, res) => {
  res.send("Contacts Page");
});

const createContact = asyncHandler(async (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.send("필수 값이 입력하지 않았습니다.");
  }

  res.send("Create Contacts");
});

const selectContact = asyncHandler(async (req, res) => {
  try {
    Contact.get_user(function (result) {
      //console.log("index result", result);
      //res.render("index", { data: result });
      return res.json({
        code: 200,
        data: result,
      });
    });
  } catch (err) {
    console.log("Error select HeaderAll " + err);
    return res.json({
      code: 400,
    });
  }
});

const insertContact = asyncHandler(async (req, res) => {
  try {
    let bodyData = req.body;

    await Contact.insert_user(bodyData);
    return res.json({
      code: 200,
    });

    /* Contact.insert_user(
      req.body.userId,
      req.body.userNm,
      req.body.passwd,
      JSON.stringify(req.body.content),
      function (result) {
        res.send({ id: result });
      }
    ); */
  } catch (err) {
    console.log("Error insert HeaderAll " + err);
    return res.json({
      code: 400,
    });
  }
});

const updateContact = asyncHandler(async (req, res) => {
  try {
    let bodyData = req.body;
    await Contact.update_user(bodyData);
    return res.json({
      code: 200,
    });
  } catch (err) {
    console.log("Error updateHeaderAll " + err);
    return res.json({
      code: 400,
    });
  }
});

const deleteContact = asyncHandler(async (req, res) => {
  try {
    await Contact.delete_user(req.query.userId);
    return res.json({
      code: 200,
    });
    /* Contact.delete_user(req.query.userId, function (result) {
      res.send({ id: result });
    }); */
  } catch (err) {
    console.log("Error delete HeaderAll " + err);
    return res.json({
      code: 400,
    });
  }
});

module.exports = {
  getAllContacts,
  createContact,
  selectContact,
  insertContact,
  updateContact,
  deleteContact,
};
