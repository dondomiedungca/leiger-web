<template lang="">
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
        class="h-20 w-full flex flex-row items-center gap-5 border-2 border-white border-b-gray-200"
      >
        <button
          @click="back"
          class="px-5 py-3 rounded-lg group duration-300 bg-blue-50 hover:bg-blue-100"
        >
          <fa
            class="text-slate-400 duration-300 group-hover:text-blue-400"
            icon="fa-solid fa-chevron-left"
          />
        </button>
        <p class="font-oxygen font-semibold text-gray-300">
          MEETING ID -
          <span class="font-semibold text-gray-500">{{
            decodedSession?.meeting_id
          }}</span>
        </p>
      </div>
      <div class="h-10 w-full flex flex-row-reverse items-center gap-3 my-2">
        <p class="font-bold text-blue-400 font-oxygen text-sm cursor-pointer">
          INVITE PEOPLE
        </p>
        <fa
          class="text-blue-500 cursor-pointer"
          icon="fa-solid fa-square-plus"
          size="2x"
        />
      </div>
      <div class="w-full flex flex-col h-full gap-2 relative">
        <div class="flex-grow mb-5">
          <video
            class="rounded-lg h-4/5 w-full bg-gray-700 aspect-video"
            :srcObject="localStreamRef"
            autoplay
            playsinline
          ></video>
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
                class="py-1 px-3 group duration-300 hover:bg-blue-50 hover:border-blue-50 rounded-md cursor-pointer mb-1 border-2 border-gray-100 relative h-10 w-10"
              >
                <fa
                  class="text-slate-400 duration-300 group-hover:text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  icon="fa-solid fa-display"
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
    <section class="section-3 py-5 px-5 pl-0">
      <div
        id="sharing-container"
        class="rounded-lg bg-gray-50 w-full h-full py-4 px-4 flex flex-col"
      >
        <div class="w-full flex-grow">
          <div class="flex flex-row items-center justify-center">
            <fa
              class="text-slate-400 duration-300 group-hover:text-blue-400"
              icon="fa-solid fa-users"
            />
            <p class="font-oxygen text-xs text-gray-500 select-none">
              Participant (4)
            </p>
          </div>
          <div
            id="video-container"
            class="w-full bg-gray-200 mt-2 flex flex-row flex-wrap gap-2 content-start justify-center p-2"
          >
            <div class="video-player-box">
              <video
                v-for="remote in remotes"
                class="video-player aspect-video bg-black rounded-lg"
                :srcObject="remote.remoteStreamRef"
                autoplay
                playsinline
              ></video>
            </div>
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
</template>

<script lang="ts" setup>
import Logo from "@/assets/images/logo-no-background.png";
import { onMounted, reactive, ref, toRaw } from "vue";
import { storeToRefs } from "pinia";
import { useCookies } from "../libs/useCookies";
import { useValidateSession } from "../libs/useMeeting";
import { useFetchEffect } from "../libs/useFetchEffect";
import { useRouter } from "vue-router";
import { io } from "socket.io-client";
import { useAuthStore } from "../stores/useAuth.store";
import TextInput from "../components/TextInput.vue";

const { getCookie } = useCookies();
const { fetch, ...handleValidateSession } = useValidateSession();
const router = useRouter();
const authStore = useAuthStore();
const { auth } = storeToRefs(authStore);

const tools = reactive({ isMuted: false, isOpenCam: true });

const localStreamRef = ref<MediaStream | undefined>();
const remotes = ref<
  Array<{ user_identifier: string; remoteStreamRef: MediaStream }>
>([]);
const peers = reactive<
  Array<{ user_identifier: string; peerConnection: RTCPeerConnection }>
>([]);

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
  await fetch({ session, meeting_sid });
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
  const peer = localPeers.find(
    (peer) => peer.user_identifier === _socket_data.user_identifier
  );
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
      createOffer(_socket_data.user_identifier);
    });

    socket.value.on("ice_candidate", onIce);

    socket.value.on("answer", (_socket_data: Record<string, any>) => {
      addAnswer(_socket_data.payload, _socket_data.user_identifier);
    });

    socket.value.on("offer", (_socket_data: Record<string, any>) => {
      createAnswer(_socket_data.user_identifier, _socket_data.payload);
    });

    socket.value.on("user_leave", (_socket_data: Record<string, any>) => {
      const previous = [...remotes.value];
      const index = previous.findIndex(
        (prev) => prev.user_identifier === _socket_data.user_identifier
      );
      previous.splice(index, 1);
      remotes.value = previous;
    });
  }
};

const createPeerConnection = async (user_identifier: string) => {
  const peerConnection = ref(new RTCPeerConnection(SERVERS));
  const remoteStreamRef = ref(new MediaStream());

  const check = remotes.value.find(
    (remote) => remote.user_identifier === user_identifier
  );

  const check2 = peers.find((peer) => peer.user_identifier === user_identifier);

  if (!check) {
    remotes.value = [
      ...remotes.value,
      {
        user_identifier,
        remoteStreamRef: remoteStreamRef.value,
      },
    ];
  }

  if (!check2) {
    peers.push({
      user_identifier,
      peerConnection: peerConnection.value,
    });
  }

  if (!localStreamRef.value) {
    localStreamRef.value = await navigator.mediaDevices.getUserMedia({
      audio: tools.isMuted,
      video: tools.isOpenCam
        ? {
            facingMode: "user",
          }
        : false,
    });
  }

  localStreamRef.value!.getTracks().forEach((track: any) => {
    peerConnection.value.addTrack(track, localStreamRef.value!);
  });

  peerConnection.value.ontrack = (event: any) => {
    event.streams[0].getTracks().forEach((track: any) => {
      remoteStreamRef.value!.addTrack(track);
    });
  };

  peerConnection.value.onicecandidate = async (event: any) => {
    if (event.candidate) {
      socket.value.emit("ice_candidate", {
        meeting_id: decodedSession.value!.meeting_id,
        user_identifier: decodedSession.value!.user_identifier,
        payload: event.candidate,
      });
    }
  };
};

const createOffer = async (user_identifier: string) => {
  await createPeerConnection(user_identifier);

  const peer = peers.find((peer) => peer.user_identifier === user_identifier);

  let offer = await peer!.peerConnection.createOffer();
  await peer!.peerConnection.setLocalDescription(offer);

  socket.value.emit("offer", {
    meeting_id: decodedSession.value!.meeting_id,
    user_identifier: decodedSession.value!.user_identifier,
    payload: offer,
  });
};

const createAnswer = async (user_identifier: string, payload: any) => {
  await createPeerConnection(user_identifier);

  const peer = peers.find((peer) => peer.user_identifier === user_identifier);

  await peer!.peerConnection.setRemoteDescription(payload);

  let answer = await peer!.peerConnection.createAnswer();
  await peer!.peerConnection.setLocalDescription(answer);

  socket.value.emit("answer", {
    meeting_id: decodedSession.value!.meeting_id,
    user_identifier: decodedSession.value!.user_identifier,
    payload: answer,
  });
};

const addAnswer = async (answer: any, _user_identifier: string) => {
  const peer = peers.find((peer) => peer.user_identifier === _user_identifier);

  if (!peer!.peerConnection.currentRemoteDescription) {
    peer!.peerConnection.setRemoteDescription(answer);
  }
};

const toggleTools = async (key: string) => {
  (tools as any)[key] = !(tools as any)[key];
  if (key == "isOpenCam") {
    const videoTrack = localStreamRef.value
      ?.getTracks()
      .find((track) => track.kind === "video");
    if (videoTrack !== undefined) {
      videoTrack!.enabled = tools.isOpenCam;
    } else {
      localStreamRef.value = await navigator.mediaDevices.getUserMedia({
        audio: tools.isMuted,
        video: tools.isOpenCam
          ? {
              facingMode: "user",
            }
          : false,
      });
    }
  }
  if (key == "isMuted") {
    const audioTrack = localStreamRef.value
      ?.getTracks()
      .find((track) => track.kind === "audio");
    audioTrack!.enabled = !tools.isMuted;
  }
};

const back = () => {
  window.location.href = "/";
};

useFetchEffect(handleValidateSession, {
  onData: async (_data) => {
    if (_data == false) {
      sessionError.value = true;
    } else {
      decodedSession.value = _data as Record<string, any>;
      initializing.value = false;
      await initLocalMediaStream();
      roomAndConnectionInitializer();
    }
  },
});

onMounted(() => {
  validateSession();
});
</script>

<style lang="scss" scoped>
.section-1 {
  min-width: 80px;
  width: 8%;
}

.section-2 {
  min-width: 400px;
  width: 52%;
}

.section-3 {
  width: 40%;
}

video {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

#video-container {
  height: calc(100vh - 305px);
  overflow-y: scroll;
}

.video-player-box {
  height: 140px;
}

.video-player {
  width: 100%;
  height: 100%;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
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
