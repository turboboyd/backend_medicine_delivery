const mongoose = require("mongoose");
const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

// Предполагаем, что роуты и контроллеры уже созданы и импортированы
// app.use('/api/companies', require('./routes/companies'));
// app.use('/api/drugs', require('./routes/drugs'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
