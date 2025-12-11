const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Rota inicial para testar
app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Servidor backend rodando na porta " + PORT);
});
