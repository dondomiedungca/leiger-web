<template lang="">
  <Navbar />
  <section class="flex flex-row px-5 sm:px-8 md:px-11 lg:px-14 gap-3 mt-10">
    <div class="left-side sm:w-1/2 w-full">
      <p class="md:text-4xl text-2xl text-gray-500 intro leading-tight">
        Leiger is only for
        <span class="text-blue-500 font-bold">PORTFOLIO purposes</span> and this
        web application will never collect any money or any fee. You are free to
        use or test this web application. Thanks.
      </p>
      <br />
      <small class="text-gray-700 text-sx italic mt-5"
        >Developed by <span class="font-semibold">Dondomie Dungca</span></small
      >
      <div class="quick-connect mt-16 text-lg flex flex-col gap-3">
        <p class="text-gray-700">Get into Meeting now</p>
        <div
          v-if="
            !!handleJoinMeeting.error.value ||
            handleJoinMeeting.data.value == false
          "
        >
          <div
            class="lg:w-1/2 w-full flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            <svg
              class="flex-shrink-0 inline w-4 h-4 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
              />
            </svg>
            <span class="sr-only">Error</span>

            <div>
              <span class="font-bold">Error:</span>
              {{
                handleJoinMeeting.error.value?.response?.data?.message?.join(
                  ", "
                ) ||
                handleJoinMeeting.error.value?.message ||
                (handleJoinMeeting.error.value == false
                  ? "Meeting ID or Password is incorrect"
                  : undefined) ||
                "Something went wrong. Please try again"
              }}
            </div>
          </div>
        </div>
        <TextInput
          class="lg:w-1/2 w-full"
          v-model="meetingId"
          placeholder="Room ID"
          @onPressEnter="joinMeeting"
        />
        <TextInput
          class="lg:w-1/2 w-full"
          v-model="password"
          placeholder="Password"
          type="password"
          @onPressEnter="joinMeeting"
        />
        <button
          @click="joinMeeting"
          class="px-4 py-2 lg:w-1/2 w-full text-xs text-gray-600 drop-shadow-md duration-500 transform active:scale-75 transition-transform bg-blue-100 rounded-lg flex flex-row items-center text-center justify-center"
        >
          <img :src="ProceedImage" alt="" class="w-4" />
          <p class="font-bold ml-2 mt-1">
            {{ handleJoinMeeting.isLoading.value ? "JOINING ..." : "JOIN NOW" }}
          </p>
        </button>
        <button
          data-modal-target="create-meeting"
          data-modal-toggle="create-meeting"
          class="px-4 py-2 lg:w-1/2 w-full text-xs text-gray-600 drop-shadow-md duration-500 transform active:scale-75 transition-transform bg-gray-100 rounded-lg flex flex-row items-center text-center justify-center"
        >
          <img :src="CreateImage" alt="" class="w-4" />
          <p class="font-bold ml-2 mt-1">CREATE MEETING</p>
        </button>
      </div>
    </div>
    <div class="hidden sm:block right-side w-1/2">
      <div class="big-picture flex items-center justify-center">
        <img :src="BigPictureImage" alt="" class="w-72" />
      </div>
      <div class="small-picture flex flex-row items-center justify-between">
        <img :src="SmallPicture1Image" alt="" class="w-1/2" />
        <img :src="SmallPicture2Image" alt="" class="w-1/2" />
      </div>
    </div>
  </section>

  <section class="flex flex-col px-5 sm:px-8 md:px-11 lg:px-14 gap-3 mt-10">
    <p class="text-xl w-full text-center text-gray-500 font-semibold mb-8">
      WHY USE PREMIUM VERSION
    </p>
    <div
      class="flex flex-col sm:flex-row justify-between gap-2 sm:gap-8 md:gap-12"
    >
      <div class="bg-gray-50 px-4 py-3 rounded-lg drop-shadow-md mb-5">
        <div class="flex flex-row items-center gap-3 mb-4">
          <img :src="LatencyImage" alt="" class="w-8" />
          <p class="text-md text-gray-600 font-semibold">
            HI ACTIVE NO LATENCY
          </p>
        </div>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock,
        </p>
      </div>
      <div class="bg-gray-50 px-4 py-3 rounded-lg drop-shadow-md mb-5">
        <div class="flex flex-row items-center gap-3 mb-4">
          <img :src="RecordImage" alt="" class="w-10" />
          <p class="text-md text-gray-600 font-semibold">UNLIMITED RECORDING</p>
        </div>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock,
        </p>
      </div>
      <div class="bg-gray-50 px-4 py-3 rounded-lg drop-shadow-md mb-5">
        <div class="flex flex-row items-center gap-3 mb-4">
          <img :src="ConnectImage" alt="" class="w-8" />
          <p class="text-md text-gray-600 font-semibold">SOFTWARE CONNECT</p>
        </div>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock,
        </p>
      </div>
    </div>
  </section>
  <section
    class="bg-blue-50 w-full flex flex-col sm:flex-row justify-between px-5 sm:px-8 md:px-11 lg:px-14 py-7 mt-14 gap-3"
  >
    <div class="order-1">
      <p class="text-lg text-gray-500 font-light">VISIT AND FOLLOW US</p>
      <div class="flex flex-row gap-2 mt-3">
        <a href="">
          <img :src="FBImage" alt="" class="w-7" />
        </a>
        <a href="">
          <img :src="InstagramImage" alt="" class="w-7" />
        </a>
        <a href="">
          <img :src="TwitterImage" alt="" class="w-7" />
        </a>
      </div>
      <div class="flex flex-col mt-10 gap-1">
        <a href="" class="text-xs font-semibold"> Community </a>
        <a href="" class="text-xs font-semibold"> Technical and Support </a>
        <a href="" class="text-xs font-semibold"> Ebooks </a>
        <a href="" class="text-xs font-semibold"> Latest News </a>
      </div>
    </div>

    <div
      class="sm:order-2 order-3 flex flex-col sm:justify-between mt-10 sm:mt-0 w-80 md:w-96"
    >
      <div>
        <TextInput placeholder="EMAIL" class="w-full" />
        <button
          class="w-full px-4 py-2 mt-1 text-xs text-gray-600 drop-shadow-md duration-500 transform active:scale-75 transition-transform bg-white rounded-lg"
        >
          SUBSCRIBE TO OUR NEWSLETTER
        </button>
      </div>
      <div class="flex flex-col mt-2 sm:mt-10 gap-1">
        <a href="" class="text-xs font-semibold"> TERMS AND POLICY </a>
        <a href="" class="text-xs text-gray-500 font-light">
          LEIGER ALL RIGHTS RESERVED {{ new Date().getFullYear() }}</a
        >
      </div>
    </div>

    <div
      class="sm:order-3 order-2 flex flex-col sm:justify-between mt-10 sm:mt-0"
    >
      <img :src="LogoImage" alt="" class="w-32" />
      <div class="flex flex-col mt-2 sm:mt-10 gap-1">
        <a href="#" class="text-xs font-semibold"> ROADMAP </a>
        <a href="#" class="text-xs font-semibold"> ABOUT US </a>
        <a href="#" class="text-xs font-semibold"> DEVELOPER </a>
      </div>
    </div>
  </section>

  <!-- Main modal -->
  <div
    id="create-meeting"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-sm max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-md font-semibold text-gray-500 dark:text-white">
            Create Meeting
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="create-meeting"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <div>
            <label for="" class="text-xs text-gray-500"
              >Auto-generated Meeting ID</label
            >
            <div class="flex flex-row items-center gap-2">
              <TextInput
                id="meeting_id"
                disabled
                class="w-full bg-gray-100"
                v-model="generatedMeetingId"
              />
              <button class="group" @click="copyClipboard">
                <fa
                  class="text-slate-400 duration-300 group-hover:text-blue-400"
                  icon="fa-solid fa-copy"
                />
              </button>
            </div>
          </div>
          <div>
            <label for="" class="text-xs text-gray-500">Password</label>
            <TextInput
              type="password"
              placeholder="Create your meeting password"
              class="w-full"
              v-model="createPassword"
              @onPressEnter="createMeeting"
            />
          </div>
          <div v-if="!!handleCreateMeeting.error.value">
            <div
              class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
              role="alert"
            >
              <svg
                class="flex-shrink-0 inline w-4 h-4 mr-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                />
              </svg>
              <span class="sr-only">Error</span>

              <div>
                <span class="font-bold">Error:</span>
                {{
                  handleCreateMeeting.error.value?.response?.data?.message?.join(
                    ", "
                  ) ||
                  handleCreateMeeting.error.value?.message ||
                  "Something went wrong. Please try again"
                }}
              </div>
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            @click="createMeeting"
            type="button"
            class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {{
              handleCreateMeeting.isLoading.value ? "Creating ..." : "Create"
            }}
          </button>
          <button
            data-modal-hide="create-meeting"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-xs font-medium px-2 py-1.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue";
import TextInput from "@/components/TextInput.vue";
import BigPictureImage from "@/assets/images/big-picture.png";
import SmallPicture1Image from "@/assets/images/small-picture-1.png";
import SmallPicture2Image from "@/assets/images/small-picture-2.png";
import LatencyImage from "@/assets/images/latency.png";
import RecordImage from "@/assets/images/record.png";
import ConnectImage from "@/assets/images/connect.png";
import FBImage from "@/assets/images/fb.png";
import InstagramImage from "@/assets/images/instagram.png";
import TwitterImage from "@/assets/images/twitter.png";
import LogoImage from "@/assets/images/logo-no-background.png";
import CreateImage from "@/assets/images/create.png";
import ProceedImage from "@/assets/images/proceed.png";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import { useCreateMeeting, useJoin } from "../libs/useMeeting";
import { useAuthStore } from "../stores/useAuth.store";
import { useFetchEffect } from "../libs/useFetchEffect";
import { useCookies } from "../libs/useCookies";

onMounted(() => {
  initFlowbite();
});

const { fetch, ...handleCreateMeeting } = useCreateMeeting();
const { fetch: join, ...handleJoinMeeting } = useJoin();
const authStore = useAuthStore();
const { auth } = storeToRefs(authStore);
const { setCookie } = useCookies();

const generateRandomString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generatedMeetingId = ref<string>(`LG-${generateRandomString(8)}`);
const createPassword = ref<string>("");

const meetingId = ref<string>("");
const password = ref<string>("");

const copyClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedMeetingId.value || "");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

const createMeeting = () => {
  fetch({
    meeting_id: generatedMeetingId.value,
    password: createPassword.value,
    creator_id: auth.value.is_authenticated ? auth.value.user?.id : undefined,
  });
};

const joinMeeting = () => {
  join({
    meeting_id: meetingId.value,
    password: password.value,
    joiner_id: auth.value.is_authenticated ? auth.value.user?.id : undefined,
  });
};

useFetchEffect(handleCreateMeeting, {
  onData: (data: string) => {
    if (data) {
      setCookie("MEETING_SESSION", data);
      window.location.href = `/room?meeting_sid=${generatedMeetingId.value}`;
    }
  },
});

useFetchEffect(handleJoinMeeting, {
  onData: (data: string) => {
    if (data) {
      setCookie("MEETING_SESSION", data);
      window.location.href = `/room?meeting_sid=${meetingId.value}`;
    }
  },
});
</script>

<style lang="scss">
.intro {
  font-family: "Oxygen", sans-serif !important;
}
</style>
