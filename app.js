const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs"); // Set the correct view engine
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/create", (req, res) => {
  let currentDate = new Date();
  let day = currentDate.getDate().toString().padStart(2, "0");
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
  let year = currentDate.getFullYear();

  const fn = `${day}-${month}-${year}.txt`;

  fs.writeFile(`./files/${fn}`, "daal chini", function (err) {
    if (err) return res.send("something wrong");
    else res.send("done");
  });
});

app.get("/", (req, res) => {
  fs.readdir(`./files`, function (err, files) {
    if (err) return res.send("Error reading directory");
    res.render("index", { files });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
