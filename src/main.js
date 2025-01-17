import { createApp } from "vue";
import App from "./App.vue";
import './assets/css/main.css';
import router from "./router";
import { createMetaManager, defaultConfig } from "vue-meta";

const app = createApp(App);
const metaManager = createMetaManager(defaultConfig);

app.use(router);
app.use(metaManager);
app.mount("#app");
