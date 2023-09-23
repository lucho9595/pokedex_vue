import { createApp } from "vue";
import App from "./App.vue";
import route from "./routes/route";

const app = createApp(App);

// Usa el enrutador Vue
app.use(route);

app.mount("#app");
