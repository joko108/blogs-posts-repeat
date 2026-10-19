import express from "express";
import { setupApp } from "./setup-app";
import { SETTINGS } from "./settings/config";

const app = express();
setupApp(app);

const PORT = SETTINGS.PORT;

app.listen(PORT, () => {
    console.log(`Example app listening on port: ${PORT}`);
});
