import vue3GoogleLogin from "vue3-google-login";
import "./style.css";
import { useCache } from "./libs/useCache";
import { router, app } from "./router";

app.use(router);
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_CLIENT_ID,
});

useCache();
app.mount("#app");
