const EXPRESS = require("express");
const PATH = require("path");
require("./conn");
const APP_MODEL = require("./schema_model");

const APP = EXPRESS();
const PORT = 1001;
const IP = "localhost";
const PUBLIC_PATH = PATH.join(__dirname, "../public/");
const VIEWS_PATH = PATH.join(__dirname, "../views");

let msg = "Short Notes App ©️ Karan Yadav";
let msgColor = "rgb(255, 0, 119)";

APP.use(EXPRESS.static(PUBLIC_PATH));

APP.set("views", VIEWS_PATH);
APP.set("view engine", "hbs");

APP.use(
  EXPRESS.urlencoded({
    extended: false,
  })
);

// READ
APP.get("/shortNotesByKaranYadav", (req, res) => {
  console.log(
    "--------------------------------------------------------------------------------------"
  );
  console.log("fetching data...");
  APP_MODEL.find()
    .then((data) => {
      console.log("[+] data fetched");
      res.render("index", { data: data, msg: msg, msgColor: msgColor });
    })
    .catch((err) => {
      console.log("[-] unable to fetch data");
      console.log(err);
      res.send("[!] Error while fetching data");
    });
});

// CREATE
APP.post("/shortNotesByKaranYadav/add-data", async (req, res) => {
  console.log(
    "--------------------------------------------------------------------------------------"
  );
  console.log("Adding data...");
  try {
    let title = String(req.body.userNote_title);
    let desc = String(req.body.userNote_desc);
    let date = String(req.body.userNote_date);
    const addDataToDb = new APP_MODEL({
      note_title: title,
      note_desc: desc,
      note_date: date,
    });
    await addDataToDb.save();
    console.log("[+] data added to database");
    msg = "Note added";
    msgColor = "green";
    res.redirect("/shortNotesByKaranYadav");
  } catch (err) {
    console.log("[-] Error occured while saving data");
    console.log(err);
    res.send("[!] Error while saving");
  }
});

// DELETE
APP.post("/delete-document/:slug", (req, res) => {
  console.log(
    "--------------------------------------------------------------------------------------"
  );
  console.log("Deleting data...");
  let id = req.params.slug;
  APP_MODEL.deleteOne({ _id: id })
    .then((data) => {
      console.log(data);
      console.log(`[+] data deleted`);
      msg = "Note deleted";
      msgColor = "red";
      res.redirect("/shortNotesByKaranYadav");
    })
    .catch((err) => {
      console.log("[-] Error while deleting data");
      console.log(err);
      res.send(
        `[!] Error while deleting | http://${IP}:${PORT}/shortNotesByKaranYadav`
      );
    });
});

// UPDATE
APP.post("/update-document/:slug", (req, res) => {
  console.log(
    "--------------------------------------------------------------------------------------"
  );
  console.log("Updating the document...");
  let title = String(req.body.modify_userTitle);
  let desc = String(req.body.modify_userNote);

  APP_MODEL.updateOne(
    { _id: req.params.slug },
    { $set: { note_title: title, note_desc: desc } }
  )
    .then((data) => {
      console.log(data);
      console.log(`[+] document updated`);
      msg = "Note updated";
      msgColor = "green";
      res.redirect("/shortNotesByKaranYadav");
    })
    .catch((err) => {
      console.log(`[-] Error while updating document`);
      console.log(err);
      res.send(
        `[!] Error while updating | http://${IP}:${PORT}/shortNotesByKaranYadav`
      );
    });
});

APP.listen(PORT, (err) => {
  if (err) {
    console.log("[-] Server not started");
    return err;
  } else {
    console.log(`[+] Server started`);
    console.log(`Visit the site: http://${IP}:${PORT}/shortNotesByKaranYadav`);
  }
});
