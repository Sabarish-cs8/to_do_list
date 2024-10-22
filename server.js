const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("data/db.json"); // Path to your db.json
const middlewares = jsonServer.defaults();

// Enable CORS
server.use(cors());
server.use(middlewares);
server.use(router);

const PORT = 3500;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
