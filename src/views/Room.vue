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
  <div
    id="leave-meeting"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-sm max-h-full">
      <!-- Modal content -->
      <div class="relative bg-gray-700 rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-6 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-md font-semibold text-gray-300">
            LEAVE CURRENT MEETING?
          </h3>
          <button
            type="button"
            class="duration-300 text-gray-400 bg-gray-600 hover:bg-gray-500 hover:text-gray-900 rounded-sm text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          <p class="font-oxygen font-normal text-sm text-gray-200">
            Leaving this meeting will delete your session and in order to join
            again you need to join via MEETING ID and password at home section.
            Do you really want to proceed?
          </p>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            @click="leaveMeeting"
            type="button"
            class="text-white duration-300 bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-sm text-xs px-2 py-1.5 text-center"
          >
            Yes
          </button>
          <button
            data-modal-hide="leave-meeting"
            type="button"
            class="text-gray-600 duration-300 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-sm text-xs px-2 py-1.5 text-center"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </div>
  <main class="bg-gray-950 h-screen w-screen relative">
    <section
      id="main-container"
      :class="`bg-gray-200 w-full flex flex-col sm:flex-row relative`"
    >
      <!-- Sharing screen section -->
      <div
        v-if="someonesharing.length"
        :class="`bg-gray-800 flex flex-row items-center justify-center w-full h-1/2 sm:h-full p-5 pt-14`"
      >
        <VideoComponent
          :isForSharing="true"
          :srcObject="peers[someonesharing[0]].remoteStreamRef"
          :user_identifier="`${
            peers[someonesharing[0]].user_identifier
          } is sharing screen`"
          :isOpenCam="true"
          :isOpenMic="open_mics.includes(someonesharing[0])"
        />
      </div>
      <!-- Initial screen including you -->
      <div
        :class="`bg-gray-800 w-full ${
          someonesharing.length ? 'h-1/2' : 'h-full'
        } sm:h-full flex flex-row content-${
          someonesharing.length || Object.keys(peers).length
            ? 'start'
            : 'center'
        } items-center justify-center flex-wrap gap-2 overflow-auto p-5 pt-12 min-h-1/2`"
      >
        <VideoComponent
          id="current"
          :isActive="!someonesharing.length"
          :srcObject="localStreamRef"
          :isSomeoneSharing="!!someonesharing.length"
          :isMini="isMini"
          :isOpenCam="tools.isOpenCam"
          :isOpenMic="!tools.isMuted"
          :user_identifier="`YOU - ${decodedSession?.user_identifier}`"
          :muted="true"
        />
        <template v-for="(peer, sid) in peers">
          <VideoComponent
            :isActive="someonesharing[0] === sid"
            :id="sid"
            :srcObject="peer.remoteStreamRef"
            :isSomeoneSharing="!!someonesharing.length"
            :isMini="isMini"
            :isOpenCam="open_cams.includes(sid)"
            :isOpenMic="open_mics.includes(sid)"
            :user_identifier="peer.user_identifier"
          />
        </template>
      </div>
      <div
        class="absolute top-2 left-2 bg-gray-700 rounded-md py-1 px-2 flex flex-row gap-4 items-center justify-center z-30 border-2 border-gray-500"
      >
        <p class="text-gray-200 text-sm font-oxygen">
          <span class="text-gray-500">MEETING ID:</span>
          <span id="meeting_id">{{ decodedSession?.meeting_id }}</span>
        </p>
        <button class="group" @click="copyClipboard">
          <fa
            class="text-white duration-300 group-hover:text-blue-400"
            icon="fa-solid fa-copy"
          />
        </button>
      </div>
      <img
        v-if="auth.is_authenticated"
        class="absolute top-2 right-2 w-8 rounded"
        :src="auth.user?.user_meta.profile_photo"
      />
    </section>
    <section
      id="tools"
      class="bg-gray-900 w-11/12 sm:w-2/3 lg:w-2/5 h-12 sm:h-14 absolute bottom-2 left-1/2 -translate-x-1/2 rounded-md flex flex-row gap-3 p-1 items-center justify-center"
    >
      <img
        :src="Logo"
        class="sm:block w-10 sm:w-24 lg:w-20 absolute left-2"
        alt=""
      />
      <button
        @click="() => toggleTools('isOpenCam')"
        class="bg-gray-800 p-2 rounded-md ml-10 sm:ml-0"
      >
        <img
          :src="
            tools.isScreenSharing
              ? VideoBanImage
              : tools.isOpenCam
              ? VideoImage
              : VideoDisableImage
          "
          alt=""
          class="w-5 sm:w-6"
        />
      </button>
      <button
        @click="() => toggleTools('isMuted')"
        class="bg-gray-800 p-2 rounded-md"
      >
        <img
          :src="tools.isMuted ? MicrophoneDisableImage : MicrophoneImage"
          alt=""
          class="w-5 sm:w-6"
        />
      </button>
      <button @click="() => shareScreen()" class="bg-gray-800 p-2 rounded-md">
        <img
          :src="tools.isScreenSharing ? DisplayImage : DisplayDisableImage"
          alt=""
          class="w-5 sm:w-6"
        />
      </button>
      <div class="rounded-md flex flex-row gap-1 ml-2">
        <small class="text-white font-oxygen font-normal">{{
          Object.keys(peers).length + 1
        }}</small>
        <fa
          class="text-slate-400 duration-300 group-hover:text-blue-400"
          icon="fa-solid fa-users"
        />
      </div>
      <button
        data-modal-target="leave-meeting"
        data-modal-toggle="leave-meeting"
        class="bg-red-600 p-2 rounded-md sm:absolute sm:right-2"
      >
        <img :src="LeaveImage" alt="" class="w-5 sm:w-6" />
      </button>
    </section>
  </main>
</template>

<script lang="ts" setup>
import Logo from "@/assets/images/logo-no-background.png";
import EmptyImage from "@/assets/images/empty.png";
import MicrophoneImage from "@/assets/images/microphone.png";
import MicrophoneDisableImage from "@/assets/images/microphone-disable.png";
import VideoImage from "@/assets/images/video.png";
import VideoDisableImage from "@/assets/images/video-disable.png";
import VideoBanImage from "@/assets/images/video-ban.png";
import DisplayImage from "@/assets/images/display.png";
import DisplayDisableImage from "@/assets/images/display-disable.png";
import MoreImage from "@/assets/images/more.png";
import LeaveImage from "@/assets/images/leave.png";
import {
  nextTick,
  onMounted,
  reactive,
  ref,
  toRaw,
  computed,
  watch,
} from "vue";
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
const screen_width = ref<number>(document.body.clientWidth);
const screen_height = ref<number>(document.documentElement.scrollHeight);
const isMini = ref<boolean>(false);

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

const validateSize = () => {
  isMini.value = false;
  if (someonesharing.value.length) {
    if (screen_height.value <= 650) {
      isMini.value = true;
    } else {
      if (screen_width.value <= 768) {
        isMini.value = true;
      }
    }
  } else {
    if (
      screen_width.value <= screen_height.value ||
      screen_height.value <= 650
    ) {
      isMini.value = true;
    }
  }
};

watch([someonesharing, screen_height, screen_width], validateSize);

window.addEventListener("resize", () => {
  screen_width.value = document.body.clientWidth;
  screen_height.value = document.body.clientHeight;
});

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
      transports: ["websocket"],
      secure: true,
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
    if (tools.isScreenSharing) {
      socket.value.emit("update_video_canvas", {
        isScreenSharing: tools.isScreenSharing,
        meeting_id: decodedSession.value!.meeting_id,
      });
    }
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
  try {
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
            audio: true,
            video: true,
            cursor: true,
          } as Record<string, any>);

    backupLocalStreamRef.value = localStreamRef.value;
    localStreamRef.value = newStream;

    if (media_type === "screen_sharing") {
      tools.isScreenSharing = true;
      nextTick(async () => {
        const screenTrack = localStreamRef.value
          ?.getTracks()
          .find((tr) => tr.kind === "video");

        if (
          !backupLocalStreamRef.value
            ?.getTracks()
            .find((tr) => tr.kind === "video")
        ) {
          backupLocalStreamRef.value =
            await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: {
                facingMode: "user",
              },
            });
          backupLocalStreamRef.value.getVideoTracks()[0].enabled = false;
          backupLocalStreamRef.value.getAudioTracks()[0].enabled =
            !tools.isMuted;
        }

        if (!!screenTrack) {
          const audioTrack = backupLocalStreamRef.value
            ?.getTracks()
            .find((tr) => tr.kind === "audio");

          Object.keys(peers).map((socket_id) => {
            peers[socket_id].peerConnection.getSenders().forEach((sender) => {
              if (sender.track?.kind === "audio" && audioTrack) {
                sender.replaceTrack(audioTrack);
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
    }
  } catch (error) {
    if ((error as any).name === "NotAllowedError") {
      tools.isScreenSharing = false;
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
      const audioTrack = (
        tools.isScreenSharing
          ? backupLocalStreamRef.value
          : localStreamRef.value
      )
        ?.getTracks()
        .find((track) => track.kind === "audio");

      if (audioTrack !== undefined) {
        audioTrack!.enabled = !tools.isMuted;
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
  if (!tools.isScreenSharing) {
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
            tools.isScreenSharing = true;
            nextTick(() => {
              const screenTrack = stream
                .getTracks()
                .find((tr) => tr.kind === "video");

              backupLocalStreamRef.value = localStreamRef.value;
              localStreamRef.value = stream;

              const audioTrack = backupLocalStreamRef.value
                ?.getTracks()
                .find((tr) => tr.kind === "audio");

              if (screenTrack) {
                Object.keys(peers).map((socket_id) => {
                  peers[socket_id].peerConnection
                    .getSenders()
                    .forEach((sender) => {
                      if (sender.track?.kind === "video") {
                        sender.replaceTrack(screenTrack);
                      } else {
                        if (audioTrack) {
                          sender.replaceTrack(audioTrack);
                        }
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
          })
          .catch((error) => {
            if (error.name === "NotAllowedError") {
              tools.isScreenSharing = false;
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
    tools.isScreenSharing = false;
    localStreamRef.value?.getTracks().forEach((tr) => tr?.stop());
    localStreamRef.value = backupLocalStreamRef.value;
    useBackupLocalStream();
    socket.value.emit("update_video_canvas", {
      isScreenSharing: false,
      meeting_id: decodedSession.value!.meeting_id,
    });
  }
};

const leaveMeeting = () => {
  deleteCookie("MEETING_SESSION");
  window.location.href = "/";
};

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
  validateSize();
});
</script>

<style lang="scss" scoped>
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

#main-container {
  height: calc(100% - 4.5rem) !important;

  @media screen and (max-width: 640px) {
    height: calc(100% - 4rem) !important;
  }
}
</style>
