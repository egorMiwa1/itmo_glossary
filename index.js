import express from "express";
import fs from "fs";

const port = 3000;
const pathToCSV = "./res/res.csv"

const loadDataFromCSV = (path) => {
  let file = fs.readFileSync(path, "utf8").split("\n");
  let arr = [];

  for (let iter in file) {
    let temp = file[iter].split(";");
    arr.push([temp[0], temp[1]]);
  }
  return arr;
};

const generatePage = (data) => {
  let letter = "";
  let output = "<style>\nbody {background-color: silver;}\n</style>";

  for (let iter in data) {
    if (letter != data[iter][0][0]) {
      letter = data[iter][0][0];
      output += `<h2>${letter}</h2>`;
    }
    output += `<p><a href=#${iter}>${data[iter][0]}</a></p>`;
  }

  output += "<hr>";

  for (let iter in data) {
    output += `<p><a name=${iter}><b>${data[iter][0]}</b><br>${data[iter][1]}</a></p>`;
  }

  return output;
};

let app = express();

app.all("*", (req, res) => {
  res.send(generatePage(loadDataFromCSV(pathToCSV)));
});

app.listen(80);
console.log("Server runs on ")