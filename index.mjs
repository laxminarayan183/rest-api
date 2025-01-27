import express from "express";
const app = express();
app.use(express.json());

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

// http://localhost:8080/api/users?filter=username&value=ch api request
app.get("/api/users", (req, res) => {
  const {
    query: { filter, value },
  } = req;
  if (!filter && !value) return res.send(mockusers);
  if (filter && value)
    return res.send(mockusers.filter((user) => user[filter].includes(value)));
  return res.send(mockusers);
});

app.get("/api/users/:id", (req, res) => {
  console.log(req.params);
  const parseId = parseInt(req.params.id);
  if (isNaN(parseId)) return res.status(400).send({ msg: "Invalid id" });
  const findUser = mockusers.find((user) => user.id === parseId);
  if (!findUser) return res.status(404).send({ msg: "User not found" });
  return res.send(findUser);
});

// post a new user
app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const newUSer = { id: mockusers[mockusers.length - 1].id + 1, ...body };
  mockusers.push(newUSer);
  return res.status(201).send(newUSer);
});

app.listen(8080, () => {
  console.log("Server listening on 8080");
});
