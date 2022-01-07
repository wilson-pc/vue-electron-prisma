import { createApp } from "vue";
import App from "./App.vue";
import Equal from "equal-vue";
import "equal-vue/dist/style.css";

import router from "./router";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
const app = createApp(App).use(Quasar, quasarUserOptions).use(router);

app.use(Equal);
app.mount("#app");
