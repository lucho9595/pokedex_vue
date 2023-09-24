import { createApp } from "vue";
import App from "./App.vue";
import store from "./stores/store";
import route from "./routes/route";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

const app = createApp(App);

app.use(store); // Configura Vuex en tu aplicación
app.use(route); // Usa el enrutador Vue

app.mount("#app");
