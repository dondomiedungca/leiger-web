<template lang="">
  <div class="flex flex-row w-full h-full">
    <video
      class="video-player w-96 aspect-video border-2 border-b-gray-600 bg-black"
      id="user-1"
      :srcObject="localStreamRef"
      autoplay
      playsinline
    ></video>
    <video
      class="video-player w-96 aspect-video border-2 border-b-gray-600 bg-black"
      id="user-1"
      :srcObject="remoteStreamRef"
      autoplay
      playsinline
    ></video>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick, watch } from "vue";
import { useCookies } from "../libs/useCookies";
import { useValidateSession } from "../libs/useMeeting";
import { useFetchEffect } from "../libs/useFetchEffect";
import { useRouter } from "vue-router";
import { io } from "socket.io-client";

const { getCookie } = useCookies();
const { fetch, ...handleValidateSession } = useValidateSession();
const router = useRouter();

const localStreamRef = ref<MediaStream | undefined>();
const remoteStreamRef = ref<MediaStream | undefined>();
const peerConnection = ref();

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
    audio: false,
    video: {
      facingMode: "user",
    },
  });
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

    socket.value.on("ice_candidate", (_socket_data: Record<string, any>) => {
      if (peerConnection.value) {
        peerConnection.value.addIceCandidate(_socket_data.payload);
      }
    });

    socket.value.on("answer", (_socket_data: Record<string, any>) => {
      addAnswer(_socket_data.payload, _socket_data.user_identifier);
    });

    socket.value.on("offer", (_socket_data: Record<string, any>) => {
      createAnswer(_socket_data.user_identifier, _socket_data.payload);
    });
  }
};

const createPeerConnection = async (user_identifier: string) => {
  peerConnection.value = new RTCPeerConnection(SERVERS);

  remoteStreamRef.value = new MediaStream();

  if (!localStreamRef.value) {
    localStreamRef.value = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
      },
    });
  }

  localStreamRef.value!.getTracks().forEach((track: any) => {
    peerConnection.value.addTrack(track, localStreamRef.value);
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
        user_identifier,
        payload: event.candidate,
      });
    }
  };
};

const createOffer = async (user_identifier: string) => {
  await createPeerConnection(user_identifier);

  let offer = await peerConnection.value.createOffer();
  await peerConnection.value.setLocalDescription(offer);

  socket.value.emit("offer", {
    meeting_id: decodedSession.value!.meeting_id,
    user_identifier: decodedSession.value!.user_identifier,
    payload: offer,
  });
};

const createAnswer = async (user_identifier: string, payload: any) => {
  await createPeerConnection(user_identifier);

  await peerConnection.value.setRemoteDescription(payload);

  let answer = await peerConnection.value.createAnswer();
  await peerConnection.value.setLocalDescription(answer);

  socket.value.emit("answer", {
    meeting_id: decodedSession.value!.meeting_id,
    user_identifier: decodedSession.value!.user_identifier,
    payload: answer,
  });
};

const addAnswer = async (answer: any, _user_identifier: string) => {
  if (!peerConnection.value.currentRemoteDescription) {
    peerConnection.value.setRemoteDescription(answer);
  }
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

<style lang=""></style>
