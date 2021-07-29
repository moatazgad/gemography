const express = require("express");

const reposRoutes = require("./routes/repos");

const app = express();

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

app.use(reposRoutes);

app.listen(3000);
