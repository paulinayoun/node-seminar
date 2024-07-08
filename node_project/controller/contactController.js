const express = require("express");

//const app = express();

const router = express.Router();
/* const {
  getAllContacts,
  createContact,
  selectContact,
  insertContact,
  updateContact,
  deleteContact,
} = require("../service/contactService"); */

const contactService = require("../service/contactService");

/* router.route("/contact").get(getAllContacts).post(createContact); */

/* router
  .route("/contact/:id")
  .get((req, res) => {
    res.send("View Contact for ID: " + req.params.id);
  })
  .put((req, res) => {
    res.send(`Update Contact for ID : ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete Contact for ID: ${req.params.id}`);
  }); */

/* router
  .route("/")
  .get(selectContact)
  .post(insertContact)
  .put(updateContact)
  .delete(deleteContact); */

router.get("", async function (req, res) {
  try {
    return contactService.selectContact(req, res);
  } catch (err) {
    logger.info(JSON.stringify(err, null, 2));
    return res.json({
      code: 400,
    });
  }
});

router.post("/inAndUp", async function (req, res) {
  try {
    return contactService.insertContact(req, res);
  } catch (err) {
    logger.info(JSON.stringify(err, null, 2));
    return res.json({
      code: 400,
    });
  }
});

router.put("/inAndUp", async function (req, res) {
  try {
    return contactService.updateContact(req, res);
  } catch (err) {
    logger.info(JSON.stringify(err, null, 2));
    return res.json({
      code: 400,
    });
  }
});

router.delete("/delete", async function (req, res) {
  try {
    return contactService.deleteContact(req, res);
  } catch (err) {
    logger.info(JSON.stringify(err, null, 2));
    return res.json({
      code: 400,
    });
  }
});
module.exports = router;
/*
app.use(router);
app.listen(3000, () => {
  console.log("Server Connect");
});
*/
