import express from "express";
const app = express();

const mockusers = [
  {
    id: 1,
    username: "jack",
    displayName: "Jack",
  },
  {
    id: 2,
    username: "adam",
    displayName: "Adam",
  },
  {
    id: 3,
    username: "chris",
    displayName: "Chris",
  },
];

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.get("/api/users", (req, res) => {
  res.send(mockusers);
});

app.get("/api/users/:id", (req, res) => {
  console.log(req.params);
  const parseId = parseInt(req.params.id);
  if (isNaN(parseId)) return res.status(400).send({ msg: "Invalid id" });
  const findUser = mockusers.find((user) => user.id === parseId);
  if (!findUser) return res.status(404).send({ msg: "User not found" });
  return res.send(findUser);
});

app.listen(8080, () => {
  console.log("Server listening on 8080");
});
