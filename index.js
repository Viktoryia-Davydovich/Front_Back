const initDb = require("./src/services/initializeDatabase");
const initApi = require("./src/services/initializeApi");

initDb();
initApi();

process.on("SIGINT" || "SIGTERM" || "SIGQUIT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection is closed");
    process.exit(0);
  });
});
