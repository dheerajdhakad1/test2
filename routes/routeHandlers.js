const indexRouter = require("./index");
const usersRouter = require("./users");
const openaiRouter = require("./openai");
const chatbotConfig = require("./chatbotConfig");
const login = require("./login");
const signup = require("./signup");
const params_route = require("./ChatbotUiApi");
function setupRoutes(app) {
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/openai", openaiRouter);
  app.use("/chatbotConfig", chatbotConfig);
  app.use("/login", login);
  app.use("/signup", signup);
  app.use("/ParamsApi", params_route);
}

module.exports = setupRoutes;