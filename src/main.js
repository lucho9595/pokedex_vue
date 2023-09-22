import { createApp } from "vue";
import App from "./App.vue";
import router from "./index";

const app = createApp(App);

// Usa el enrutador Vue
app.use(router);

app.mount('#app');
