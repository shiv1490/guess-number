const express = require("express");
const cors = require("cors");
const memoryStorage = require("memorystorage");
const store = memoryStorage("guess-password");

const app = express();
const port = 3000;

const password = "12345678";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/new-password", (req, res) => {
  let list = password.split("");
  list = list && list.sort(() => Math.random() - 0.5).join("");
  while (password === list) {
    list = list.sort(() => Math.random() - 0.5).join("");
  }
  store.setItem(list, list);
  return res.status(200).send({ hint: list });
});

app.post("/verify-password", (req, res) => {
  let { hint, answer } = req.body;
  let response = {};
  if (answer === password) {
    response = {
      correct: true,
      hint,
      answer,
    };
  } else {
    const highlight = [];
    answer = answer.split("");
    hint = hint.split("");
    answer.forEach((v, i) => {
      if (v === password[i]) highlight.push(v);
    });
    response = {
      correct: false,
      highlight,
      hint: hint.join(""),
      answer: answer.join(""),
    };
  }
  res.status(200).send(response);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
