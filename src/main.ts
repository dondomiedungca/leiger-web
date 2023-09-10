import vue3GoogleLogin from "vue3-google-login";
import "./style.css";
import { useCache } from "./libs/useCache";
import { router, app } from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHouse,
  faVideo,
  faBell,
  faMessage,
  faUsers,
  faGears,
  faChevronLeft,
  faSquarePlus,
  faMicrophone,
  faMicrophoneSlash,
  faGrip,
  faDisplay,
  faRightFromBracket,
  faVideoSlash,
  faPaperPlane,
  faCopy,
  faUsersViewfinder,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faHouse,
  faVideo,
  faVideoSlash,
  faBell,
  faMessage,
  faUsers,
  faGears,
  faChevronLeft,
  faSquarePlus,
  faMicrophone,
  faMicrophoneSlash,
  faGrip,
  faDisplay,
  faRightFromBracket,
  faMessage,
  faPaperPlane,
  faCopy,
  faUsersViewfinder,
  faTriangleExclamation
);

app.use(router);
app.use(vue3GoogleLogin, {
  clientId:
    process.env.NODE_ENV === "production"
      ? process.env.VITE_CLIENT_ID
      : import.meta.env.VITE_CLIENT_ID,
});
app.component("fa", FontAwesomeIcon);

useCache();
app.mount("#app");
