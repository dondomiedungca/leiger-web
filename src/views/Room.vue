<template lang="">
  <div
    v-if="sessionError"
    class="fixed w-screen h-screen bg-gray-800 z-40 top-0 left-0"
  >
    <div
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white min-h-max w-auto z-50 rounded-md flex flex-row gap-3 items-center px-4 py-2"
    >
      <fa
        class="text-red-500 text-xl"
        icon="fa-solid fa-triangle-exclamation"
      />
      <p class="font-oxygen text-red-400 font-thin">
        <span class="font-bold">ERROR: </span>Your MEETING ID is not valid or
        expired
      </p>
    </div>
  </div>
  <main class="flex flex-row h-screen w-full overflow-hidden">
    <!-- quick tools -->
    <section
      class="section-1 bg-gray-50 flex flex-col items-center py-10 px-2 justify-between"
    >
      <img @click="back" :src="Logo" class="w-full cursor-pointer" alt="" />

      <div class="flex flex-col items-center gap-5">
        <div
          class="rounded-md py-2 px-2 duration-300 hover:bg-blue-200 cursor-pointer group"
        >
          <fa
            class="text-slate-400 duration-300 group-hover:text-blue-400"
            icon="fa-solid fa-house"
          />
        </div>
        <div
          class="rounded-md py-2 px-2 duration-300 hover:bg-blue-200 cursor-pointer group"
        >
          <fa
            class="text-slate-400 duration-300 group-hover:text-blue-400"
            icon="fa-solid fa-video"
          />
        </div>
        <div
          class="rounded-md py-2 px-2 duration-300 hover:bg-blue-200 cursor-pointer group"
        >
          <fa
            class="text-slate-400 duration-300 group-hover:text-blue-400"
            icon="fa-solid fa-bell"
          />
        </div>
        <div
          class="rounded-md py-2 px-2 duration-300 hover:bg-blue-100 cursor-pointer group"
        >
          <fa
            class="text-slate-400 duration-300 group-hover:text-blue-400"
            icon="fa-solid fa-message"
          />
        </div>
        <div
          class="rounded-md py-2 px-2 duration-300 hover:bg-blue-200 cursor-pointer group"
        >
          <fa
            class="text-slate-400 duration-300 group-hover:text-blue-400"
            icon="fa-solid fa-users"
          />
        </div>
        <div
          class="rounded-md py-2 px-2 duration-300 hover:bg-blue-200 cursor-pointer group"
        >
          <fa
            class="text-slate-400 duration-300 group-hover:text-blue-400"
            icon="fa-solid fa-gears"
          />
        </div>
      </div>

      <img
        v-if="auth.is_authenticated"
        class="w-8 rounded-lg cursor-pointer"
        :src="auth.user?.user_meta.profile_photo"
      />
    </section>

    <!-- main call container -->
    <section class="section-2 bg-white px-5 py-5 flex flex-col">
      <div
        class="h-12 mda:h-20 w-full flex flex-row items-center gap-2 mda:gap-5 border-2 border-white border-b-gray-200"
      >
        <button
          @click="back"
          class="px-3 py-1 mda:px-5 mda:py-3 rounded-lg group duration-300 bg-blue-50 hover:bg-blue-100"
        >
          <fa
            class="text-slate-400 duration-300 group-hover:text-blue-400"
            icon="fa-solid fa-chevron-left"
          />
        </button>
        <p class="font-oxygen text:xs font-semibold text-gray-300">
          MEETING ID -
          <span id="meeting_id" class="font-semibold text-gray-500">{{
            decodedSession?.meeting_id
          }}</span>
        </p>
        <button class="group" @click="copyClipboard">
          <fa
            class="text-slate-400 duration-300 group-hover:text-blue-400"
            icon="fa-solid fa-copy"
          />
        </button>
      </div>
      <div
        class="h-8 mda:h-10 w-full flex flex-row-reverse items-center gap-1 mda:gap-3 my-1 mda:my-2"
      >
        <p
          class="font-bold text-blue-400 font-oxygen text:xs mda:text-sm cursor-pointer p-0"
        >
          INVITE PEOPLE
        </p>
        <fa
          class="text-blue-500 cursor-pointer"
          icon="fa-solid fa-square-plus"
          :size="`${screen_width >= 896 ? '2x' : '1x'}`"
        />
      </div>
      <div class="w-full flex flex-col h-full gap-2 relative">
        <div class="flex-grow">
          <VideoComponent
            :srcObject="
              !someonesharing.length
                ? localStreamRef
                : peers[someonesharing[0]].remoteStreamRef
            "
            classes="rounded-lg h-1/2 mda:h-4/5 w-full bg-black aspect-video border-2 border-blue-500 relative"
            :overrideClass="true"
            :user_identifier="
              !someonesharing.length
                ? 'YOU'
                : peers[someonesharing[0]].user_identifier
            "
            :isOpenCam="
              !someonesharing.length
                ? tools.isScreenSharing
                  ? true
                  : tools.isOpenCam
                : true
            "
          />
          <div
            v-if="Object.keys(peers).length"
            id="video-container-row"
            class="mda:hidden flex flex-row gap-3 items-center mt-6 h-1/4 overflow-x-auto overflow-y-hidden pb-2"
          >
            <VideoComponent
              v-if="someonesharing.length"
              :srcObject="localStreamRef"
              :showIcons="true"
              :isOpenCam="tools.isOpenCam"
              :isOpenMic="!tools.isMuted"
              :user_identifier="'YOU'"
            />
            <template v-for="(peer, sid) in peers">
              <VideoComponent
                v-if="!someonesharing.includes(sid)"
                :key="sid"
                :id="sid"
                :srcObject="peer.remoteStreamRef"
                :showIcons="true"
                :isOpenCam="open_cams.includes(sid)"
                :isOpenMic="open_mics.includes(sid)"
                :user_identifier="peer.user_identifier"
              />
            </template>
          </div>
          <div
            v-else
            class="mda:hidden flex flex-col gap-2 items-center justify-center h-1/4 mt-6"
          >
            <img :src="EmptyImage" alt="" class="w-32" />
            <p>You are the only participant</p>
          </div>
        </div>
        <div
          class="absolute bottom-0 flex flex-row justify-between items-center h-1/5 w-full border-white border-t-gray-200 border-2"
        >
          <div class="flex flex-row gap-3">
            <div class="text-center">
              <div
                @click="() => toggleTools('isMuted')"
                :class="`py-1 px-3 group duration-300 ${
                  tools.isMuted ? '' : 'bg-blue-100 border-blue-100'
                } hover:bg-blue-50 hover:border-blue-50 rounded-md cursor-pointer mb-1 border-2 border-gray-100 relative h-10 w-10`"
              >
                <fa
                  :class="`${
                    tools.isMuted ? 'text-slate-400' : 'text-blue-500'
                  } duration-300 group-hover:text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`"
                  :icon="`fa-solid ${
                    tools.isMuted ? 'fa-microphone-slash' : 'fa-microphone'
                  }`"
                />
              </div>
              <p class="text-xs font-oxygen text-gray-400 select-none">Mic</p>
            </div>
            <div class="text-center">
              <div
                @click="() => toggleTools('isOpenCam')"
                :class="`py-1 px-3 group duration-300 ${
                  !tools.isOpenCam ? '' : 'bg-blue-100 border-blue-100'
                } hover:bg-blue-50 hover:border-blue-50 rounded-md cursor-pointer mb-1 border-2 border-gray-100 relative h-10 w-10`"
              >
                <fa
                  :class="`${
                    !tools.isOpenCam ? 'text-slate-400' : 'text-blue-500'
                  }  duration-300 group-hover:text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`"
                  :icon="`fa-solid ${
                    tools.isOpenCam ? 'fa-video' : 'fa-video-slash'
                  }`"
                />
              </div>
              <p class="text-xs font-oxygen text-gray-400 select-none">Cam</p>
            </div>
            <div class="text-center">
              <div
                class="py-1 px-3 group duration-300 hover:bg-blue-50 hover:border-blue-50 rounded-md cursor-pointer mb-1 border-2 border-gray-100 relative h-10 w-10"
              >
                <fa
                  class="text-slate-400 duration-300 group-hover:text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  icon="fa-solid fa-grip"
                />
              </div>
              <p class="text-xs font-oxygen text-gray-400 select-none">
                Display
              </p>
            </div>
            <div class="text-center">
              <div
                @click="shareScreen"
                :class="`py-1 px-3 group duration-300 ${
                  !tools.isScreenSharing ? '' : 'bg-blue-100 border-blue-100'
                } hover:bg-blue-50 hover:border-blue-50 rounded-md cursor-pointer mb-1 border-2 border-gray-100 relative h-10 w-10`"
              >
                <fa
                  :class="`${
                    !tools.isScreenSharing ? 'text-slate-400' : 'text-blue-500'
                  } duration-300 group-hover:text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`"
                  :icon="`fa-solid ${
                    tools.isScreenSharing ? 'fa-users-viewfinder' : 'fa-display'
                  }`"
                />
              </div>
              <p class="text-xs font-oxygen text-gray-400 select-none">
                Screen
              </p>
            </div>
          </div>
          <div>
            <div class="text-center">
              <div
                data-modal-target="leave-meeting"
                data-modal-toggle="leave-meeting"
                class="py-1 px-3 group duration-300 hover:bg-red-50 hover:border-red-50 rounded-md cursor-pointer mb-1 border-2 border-red-100"
              >
                <fa
                  class="text-red-300 duration-300 group-hover:text-red-400"
                  icon="fa-solid fa-right-from-bracket"
                />
              </div>
              <p class="text-xs font-oxygen text-gray-400 select-none">Leave</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- sharing section -->
    <section class="section-3 py-5 px-5 pl-0 hidden mda:block">
      <div
        id="sharing-container"
        class="rounded-lg bg-gray-50 w-full h-full py-4 px-4 flex flex-col"
      >
        <div class="w-full flex-grow">
          <div class="flex flex-row items-center gap-1 justify-center">
            <fa
              class="text-slate-400 duration-300 group-hover:text-blue-400"
              icon="fa-solid fa-users"
            />
            <p class="font-oxygen text-xs text-gray-500 select-none">
              Participant ({{ Object.keys(peers).length + 1 }})
            </p>
          </div>
          <div
            id="video-container"
            class="w-full bg-black mt-2 flex flex-row flex-wrap gap-5 content-start justify-center p-5"
          >
            <VideoComponent
              v-if="someonesharing.length"
              :srcObject="localStreamRef"
              :showIcons="true"
              :isOpenCam="tools.isOpenCam"
              :isOpenMic="!tools.isMuted"
              :user_identifier="'YOU'"
            />
            <template v-for="(peer, sid) in peers">
              <VideoComponent
                v-if="!someonesharing.includes(sid)"
                :key="sid"
                :id="sid"
                :srcObject="peer.remoteStreamRef"
                :showIcons="true"
                :isOpenCam="open_cams.includes(sid)"
                :isOpenMic="open_mics.includes(sid)"
                :user_identifier="peer.user_identifier"
              />
            </template>
          </div>
        </div>

        <div class="w-full">
          <div
            class="w-full h-40 bg-white rounded-xl flex items-center justify-center border-2 border-gray-200 mb-2"
          >
            <small class="text-gray-500 text-xs font-oxygen">No Messages</small>
          </div>
          <div class="w-full h-8 flex flex-row">
            <TextInput class="w-full" placeholder="Write a message">
              <template v-slot:endIcon>
                <button
                  class="flex flex-row items-center gap-2 bg-blue-200 px-2 py-2 rounded-md"
                >
                  <fa class="text-blue-500" icon="fa-solid fa-paper-plane" />
                </button>
              </template>
            </TextInput>
          </div>
        </div>
      </div>
    </section>
  </main>
  <div
    id="leave-meeting"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-sm max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-6 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-md font-semibold text-gray-500 dark:text-white">
            LEAVE CURRENT MEETING?
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="leave-meeting"
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
          <p class="font-oxygen font-normal text-sm text-gray-700">
            Leaving this meeting will delete your session and you need to join
            via MEETING ID and password. Do you really want to proceed?
          </p>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            @click="leaveMeeting"
            type="button"
            class="text-white bg-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-sm text-xs px-2 py-1.5 text-center dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-500"
          >
            Yes
          </button>
          <button
            data-modal-hide="leave-meeting"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm border border-gray-200 text-xs font-medium px-2 py-1.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from "@/assets/images/logo-no-background.png";
import EmptyImage from "@/assets/images/empty.png";
import { nextTick, onMounted, reactive, ref, toRaw } from "vue";
import { storeToRefs } from "pinia";
import { useCookies } from "../libs/useCookies";
import { useValidateSession } from "../libs/useMeeting";
import { useFetchEffect } from "../libs/useFetchEffect";
import { useRouter } from "vue-router";
import { io } from "socket.io-client";
import { useAuthStore } from "../stores/useAuth.store";
import { initFlowbite } from "flowbite";
import TextInput from "../components/TextInput.vue";
import VideoComponent from "../components/VideoComponent.vue";

const { getCookie, deleteCookie } = useCookies();
const { fetch, ...handleValidateSession } = useValidateSession();
const router = useRouter();
const authStore = useAuthStore();
const { auth } = storeToRefs(authStore);

const tools = reactive({
  isMuted: false,
  isOpenCam: false,
  isScreenSharing: false,
});
const screen_width = ref<number>(10000);
const open_mics = ref<string[]>([]);
const open_cams = ref<string[]>([]);
const someonesharing = ref<string[]>([]);

const localStreamRef = ref<MediaStream | undefined>();
const backupLocalStreamRef = ref<MediaStream | undefined>();
const peers = reactive<
  Record<
    string,
    {
      peerConnection: RTCPeerConnection;
      remoteStreamRef: MediaStream;
      user_identifier: string;
    }
  >
>({});

const socket = ref<any>();

const initializing = ref<boolean>(true);
const sessionError = ref<boolean>(false);
const decodedSession = ref<Record<string, any> | undefined>();

const SERVERS = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

const validateSession = async () => {
  const session = getCookie("MEETING_SESSION");
  if (!session || session == undefined || session == null) {
    sessionError.value = true;
    return;
  }
  const meeting_sid = router.currentRoute.value.query.meeting_sid as string;
  await fetch({
    session,
    meeting_sid,
    joiner_id: auth.value.is_authenticated ? auth.value.user?.id : undefined,
  });
};

const initLocalMediaStream = async () => {
  localStreamRef.value = await navigator.mediaDevices.getUserMedia({
    audio: !tools.isMuted,
    video: tools.isOpenCam
      ? {
          facingMode: "user",
        }
      : false,
  });
};

const onIce = (_socket_data: Record<string, any>) => {
  const localPeers = toRaw(peers);
  const peer = localPeers[_socket_data.socket_id];
  if (peer?.peerConnection) {
    peer.peerConnection.addIceCandidate(_socket_data.payload);
  }
};

const roomAndConnectionInitializer = async () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_API;

  if (!!decodedSession && decodedSession !== undefined) {
    socket.value = io(`${BASE_URL}/meeting`, {
      query: {
        meeting_id: decodedSession.value!.meeting_id,
        user_identifier: decodedSession.value!.user_identifier,
      },
      forceNew: true,
    });

    socket.value.on("join", (_socket_data: Record<string, any>) => {
      createOffer(_socket_data.socket_id, _socket_data.user_identifier);
    });

    socket.value.on("ice_candidate", onIce);

    socket.value.on("answer", (_socket_data: Record<string, any>) => {
      addAnswer(_socket_data.payload, _socket_data.socket_id);
    });

    socket.value.on("offer", (_socket_data: Record<string, any>) => {
      createAnswer(
        _socket_data.payload,
        _socket_data.user_identifier,
        _socket_data.socket_id,
        _socket_data?.recreate
      );

      if (tools.isScreenSharing) {
        socket.value.emit("update_video_canvas", {
          isScreenSharing: tools.isScreenSharing,
          meeting_id: decodedSession.value!.meeting_id,
        });
      }
    });

    socket.value.on("user_leave", (_socket_data: Record<string, any>) => {
      delete peers[_socket_data.socket_id];
    });

    socket.value.on("shakehand", () => {
      notifyUsersOnToggle();
    });

    socket.value.on(
      "update_video_canvas",
      (_socket_data: Record<string, any>) => {
        const previous = [...someonesharing.value];
        const index = previous.findIndex(
          (ss) => ss === _socket_data?.socket_id
        );
        if (_socket_data.isScreenSharing) {
          if (index === -1) {
            someonesharing.value.push(_socket_data.socket_id);
          }
        } else {
          if (index !== -1) {
            previous.splice(index, 1);
            someonesharing.value = previous;
          }
        }
      }
    );

    socket.value.on(
      "notify_users_on_toggle",
      (_socket_data: Record<string, any>) => {
        if (_socket_data.key === "isOpenCam") {
          const previous = [...open_cams.value];
          const index = open_cams.value.findIndex(
            (str) => str === _socket_data.socket_id
          );
          if (_socket_data.value) {
            if (index === -1) open_cams.value.push(_socket_data.socket_id);
          } else {
            previous.splice(index, 1);
            open_cams.value = previous;
          }
        } else {
          const previous = [...open_mics.value];
          const index = open_mics.value.findIndex(
            (str) => str === _socket_data.socket_id
          );
          if (_socket_data.value) {
            if (index !== -1) {
              previous.splice(index, 1);
              open_mics.value = previous;
            }
          } else {
            if (index === -1) open_mics.value.push(_socket_data.socket_id);
          }
        }
      }
    );
  }
};

const createPeerConnection = async (
  socket_id: string,
  user_identifier: string,
  recreate?: boolean,
  media_type?: "default" | "screen_sharing"
) => {
  peers[socket_id] = {
    peerConnection: new RTCPeerConnection(SERVERS),
    remoteStreamRef: new MediaStream(),
    user_identifier,
  };

  if (!localStreamRef.value || recreate) {
    await createNewLocalStreamRef(media_type);
  }

  localStreamRef.value!.getTracks().forEach((track: any) => {
    peers[socket_id].peerConnection.addTrack(track, localStreamRef.value!);
  });

  peers[socket_id].peerConnection.ontrack = (event: any) => {
    event.streams[0].getTracks().forEach((track: any) => {
      peers[socket_id].remoteStreamRef!.addTrack(track);
    });
  };

  peers[socket_id].peerConnection.onicecandidate = async (event: any) => {
    if (event.candidate) {
      socket.value.emit("ice_candidate", {
        meeting_id: decodedSession.value!.meeting_id,
        payload: event.candidate,
        user_identifier: decodedSession.value!.user_identifier,
        socket_id,
      });
    }
  };
};

const createOffer = async (
  socket_id: string,
  user_identifier: string,
  recreate?: boolean,
  media_type?: "default" | "screen_sharing"
) => {
  await createPeerConnection(socket_id, user_identifier, recreate, media_type);
  const localPeers = toRaw(peers);

  const peer = localPeers[socket_id];

  let offer = await peer!.peerConnection.createOffer();
  await peer!.peerConnection.setLocalDescription(offer);

  socket.value.emit("offer", {
    meeting_id: decodedSession.value!.meeting_id,
    payload: offer,
    user_identifier: decodedSession.value!.user_identifier,
    socket_id,
    recreate,
  });
};

const createAnswer = async (
  payload: any,
  user_identifier: string,
  socket_id: string,
  recreate?: boolean
) => {
  await createPeerConnection(socket_id, user_identifier);
  const localPeers = toRaw(peers);

  const peer = localPeers[socket_id];

  await peer!.peerConnection.setRemoteDescription(payload);

  let answer = await peer!.peerConnection.createAnswer();
  await peer!.peerConnection.setLocalDescription(answer);

  socket.value.emit("answer", {
    meeting_id: decodedSession.value!.meeting_id,
    user_identifier: decodedSession.value!.user_identifier,
    payload: answer,
    socket_id,
    recreate,
  });
};

const addAnswer = async (answer: any, socket_id: string) => {
  const localPeers = toRaw(peers);

  const peer = localPeers[socket_id];

  if (!peer!.peerConnection.currentRemoteDescription) {
    peer!.peerConnection.setRemoteDescription(answer);
    notifyUsersOnToggle();
    socket.value.emit("shakehand", {
      meeting_id: decodedSession.value!.meeting_id,
    });
  }
};

const notifyUsersOnToggle = () => {
  socket.value.emit("notify_users_on_toggle", {
    key: "isMuted",
    value: tools.isMuted,
    meeting_id: decodedSession.value!.meeting_id,
    user_identifier: decodedSession.value!.user_identifier,
  });
  socket.value.emit("notify_users_on_toggle", {
    key: "isOpenCam",
    value: tools.isOpenCam,
    meeting_id: decodedSession.value!.meeting_id,
    user_identifier: decodedSession.value!.user_identifier,
  });
};

const createNewLocalStreamRef = async (media_type = "default") => {
  const newStream =
    media_type === "default"
      ? await navigator.mediaDevices.getUserMedia({
          audio: !tools.isMuted,
          video: tools.isOpenCam
            ? {
                facingMode: "user",
              }
            : false,
        })
      : await navigator.mediaDevices.getDisplayMedia({
          audio: !tools.isMuted,
          video: true,
          cursor: true,
        } as Record<string, any>);

  backupLocalStreamRef.value = localStreamRef.value;
  localStreamRef.value = newStream;

  if (media_type === "screen_sharing") {
    const screenTrack = localStreamRef.value
      .getTracks()
      .find((tr) => tr.kind === "video");

    if (
      !backupLocalStreamRef.value?.getTracks().find((tr) => tr.kind === "video")
    ) {
      backupLocalStreamRef.value = await navigator.mediaDevices.getUserMedia({
        audio: !tools.isMuted,
        video: {
          facingMode: "user",
        },
      });
      backupLocalStreamRef.value.getVideoTracks()[0].enabled = false;
    }

    if (!!screenTrack) {
      screenTrack.onended = async function () {
        tools.isScreenSharing = false;
        localStreamRef.value = backupLocalStreamRef.value;
        useBackupLocalStream();
        socket.value.emit("update_video_canvas", {
          isScreenSharing: false,
          meeting_id: decodedSession.value!.meeting_id,
        });
      };
      socket.value.emit("update_video_canvas", {
        isScreenSharing: tools.isScreenSharing,
        meeting_id: decodedSession.value!.meeting_id,
      });
    }
  }
};

const useBackupLocalStream = () => {
  Object.keys(peers).map((socket_id) => {
    peers[socket_id].peerConnection.getSenders().forEach((sender) => {
      const track = backupLocalStreamRef.value
        ?.getTracks()
        ?.find((tr) => tr.kind === sender.track?.kind);
      if (!!track) {
        sender.replaceTrack(track);
      }
    });
  });
};

const toggleTools = async (key: string) => {
  if (key == "isOpenCam" && tools.isScreenSharing) {
    return;
  }
  (tools as any)[key] = !(tools as any)[key];
  nextTick(async () => {
    if (key == "isOpenCam") {
      const videoTrack = localStreamRef.value
        ?.getTracks()
        .find((track) => track.kind === "video");
      if (videoTrack !== undefined) {
        videoTrack!.enabled = tools.isOpenCam;
        socket.value.emit("notify_users_on_toggle", {
          key,
          value: (tools as any)[key],
          meeting_id: decodedSession.value!.meeting_id,
          user_identifier: decodedSession.value!.user_identifier,
        });
      } else {
        if (Object.keys(peers).length) {
          Object.keys(peers).map((socket_id) => {
            createOffer(socket_id, peers[socket_id].user_identifier, true);
          });
        } else {
          createNewLocalStreamRef();
        }
      }
      localStorage.setItem(
        `${decodedSession.value!.meeting_id}_isOpenCam`,
        JSON.stringify((tools as any)[key])
      );
    }
    if (key == "isMuted") {
      const audioTrack = localStreamRef.value
        ?.getTracks()
        .find((track) => track.kind === "audio");
      if (audioTrack !== undefined) {
        audioTrack!.enabled = tools.isMuted;
        socket.value.emit("notify_users_on_toggle", {
          key,
          value: (tools as any)[key],
          meeting_id: decodedSession.value!.meeting_id,
          user_identifier: decodedSession.value!.user_identifier,
        });
      }
    }
  });
};

const shareScreen = () => {
  tools.isScreenSharing = !tools.isScreenSharing;
  nextTick(() => {
    if (tools.isScreenSharing) {
      const videoTrack = localStreamRef.value
        ?.getTracks()
        .find((track) => track.kind === "video");

      if (Object.keys(peers).length) {
        if (videoTrack !== undefined) {
          navigator.mediaDevices
            .getDisplayMedia({
              audio: !tools.isMuted,
              video: true,
              cursor: true,
            } as Record<string, any>)
            .then(async (stream) => {
              const screenTrack = stream
                .getTracks()
                .find((tr) => tr.kind === "video");
              backupLocalStreamRef.value = localStreamRef.value;
              localStreamRef.value = stream;
              if (screenTrack) {
                Object.keys(peers).map((socket_id) => {
                  peers[socket_id].peerConnection
                    .getSenders()
                    .forEach((sender) => {
                      if (sender.track?.kind === "video") {
                        sender.replaceTrack(screenTrack);
                      }
                    });
                });
                screenTrack.onended = async function () {
                  tools.isScreenSharing = false;
                  localStreamRef.value = backupLocalStreamRef.value;
                  useBackupLocalStream();
                  socket.value.emit("update_video_canvas", {
                    isScreenSharing: false,
                    meeting_id: decodedSession.value!.meeting_id,
                  });
                };
                socket.value.emit("update_video_canvas", {
                  isScreenSharing: tools.isScreenSharing,
                  meeting_id: decodedSession.value!.meeting_id,
                });
              }
            });
        } else {
          if (Object.keys(peers).length) {
            Object.keys(peers).map((socket_id) => {
              createOffer(
                socket_id,
                peers[socket_id].user_identifier,
                true,
                "screen_sharing"
              );
            });
          }
        }
      }
    } else {
      localStreamRef.value?.getTracks().forEach((tr) => tr?.stop());
      localStreamRef.value = backupLocalStreamRef.value;
      useBackupLocalStream();
    }
  });
};

const back = () => {
  window.location.href = "/";
};

var onresize = function () {
  screen_width.value = document.body.clientWidth;
};

const leaveMeeting = () => {
  deleteCookie("MEETING_SESSION");
  window.location.href = "/";
};

window.addEventListener("resize", onresize);

const copyClipboard = async () => {
  let text = document.getElementById("meeting_id")?.innerHTML;
  try {
    await navigator.clipboard.writeText(text || "");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

// Catching the changes from backend if the session is valid
useFetchEffect(handleValidateSession, {
  onData: async (_data) => {
    if (_data == false) {
      sessionError.value = true;
    } else {
      decodedSession.value = _data as Record<string, any>;
      initializing.value = false;
      tools.isOpenCam = JSON.parse(
        localStorage.getItem(`${decodedSession.value.meeting_id}_isOpenCam`) ||
          "false"
      );
      nextTick(async () => {
        await initLocalMediaStream();
        roomAndConnectionInitializer();
      });
    }
  },
});

// This is the initial load
onMounted(() => {
  initFlowbite();
  validateSession();
});
</script>

<style lang="scss" scoped>
.section-1 {
  min-width: 80px;
  width: 6%;

  @media screen and (max-width: 896px) {
    width: 10%;
  }
}

.section-2 {
  min-width: 400px;
  width: 52%;

  @media screen and (max-width: 896px) {
    min-width: 100px;
    width: 96%;
  }
}

.section-3 {
  width: 42%;
}

#video-container {
  height: calc(100vh - 305px);
  overflow-y: auto;
}

/* width */
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
