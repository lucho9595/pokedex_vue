import { createApp } from "vue";
import App from "./App.vue";
import route from "./routes/route";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

const app = createApp(App);

// Usa el enrutador Vue
app.use(route);

app.mount("#app");
