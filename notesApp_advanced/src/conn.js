console.log("--------------------------------------------------------------------------------------");

console.log("Connecting to database...");

const MONGOOSE = require("mongoose");

const URL = "mongodb://0.0.0.0:27017/shortNotesApp";

MONGOOSE.connect(URL)
  .then(() => {
    console.log(`[+] Database created`);
  })
  .catch((err) => {
    console.log(`[-] Error while connecting to database`);
    console.log(err);
  });
