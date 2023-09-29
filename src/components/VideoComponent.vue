<template lang="">
  <div
    @click="onClick"
    :class="`video-container${
      isForSharing
        ? '-for-sharing'
        : isMini
        ? isSomeoneSharing
          ? '-mini'
          : '-solo'
        : ''
    } relative rounded-lg bg-gray-900 aspect-video flex-shrink flex-grow basis-full ${
      isForSharing ? 'share-border' : isActive ? 'ring-2 ring-green-400' : ''
    }`"
  >
    <video
      :srcObject="srcObject"
      autoplay
      playsinline
      :class="`absolute top-0 left-0 ${!unFlip ? '' : 'unFlip'} aspect-video`"
      :muted="muted"
    ></video>
    <div
      v-if="!isOpenCam"
      :class="`absolute top-0 left-0 w-full h-full rounded-lg z-10 ${
        user_identifier?.includes('YOU') ? 'bg-gray-700' : 'bg-gray-900'
      }`"
    ></div>
    <img
      v-if="!isOpenCam"
      :src="UserNotShowImage"
      alt=""
      class="w-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
    />
    <div
      v-if="!hideIcon"
      :class="`absolute ${
        isForSharing ? '-bottom-8' : 'bottom-1'
      } left-1 flex flex-row items-center gap-1 ${
        isForSharing ? 'z-50' : 'z-30'
      }`"
    >
      <div
        :class="`p-1 rounded-sm ${
          isForSharing ? 'bg-gray-700' : 'bg-gray-800'
        }`"
      >
        <img
          :src="isOpenMic ? MicrophoneImage : MicrophoneDisableImage"
          alt=""
          class="w-4"
        />
      </div>
      <div
        :class="`p-1 rounded-sm ${
          isForSharing ? 'bg-gray-700' : 'bg-gray-800'
        }`"
      >
        <img
          :src="isOpenCam ? VideoImage : VideoDisableImage"
          alt=""
          class="w-4"
        />
      </div>
    </div>
    <div
      :class="`absolute ${
        isForSharing ? '-bottom-8' : 'bottom-1'
      } right-1 flex flex-row items-center ${isForSharing ? 'z-50' : 'z-30'}`"
    >
      <p
        :class="`${
          isForSharing
            ? 'bg-gray-700 ring-1 ring-blue-500 text-gray-200'
            : user_identifier?.includes('YOU')
            ? 'bg-gray-400 text-gray-800 text-2xs'
            : 'bg-gray-800 text-gray-300 text-xs'
        } font-semibold font-oxygen py-1 px-2 relative right-0 ${
          isForSharing ? 'ml-3' : 'ml-5'
        }`"
      >
        {{ user_identifier || "..." }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MicrophoneImage from "@/assets/images/microphone.png";
import MicrophoneDisableImage from "@/assets/images/microphone-disable.png";
import VideoImage from "@/assets/images/video.png";
import VideoDisableImage from "@/assets/images/video-disable.png";
import UserNotShowImage from "@/assets/images/user-not-show.png";

const emit = defineEmits(["onPressDiv"]);

const props = defineProps<{
  unFlip?: boolean;
  isActive?: boolean;
  id?: string;
  isSomeoneSharing?: boolean;
  isForSharing?: boolean;
  isMini?: boolean;
  srcObject: MediaStream;
  isOpenCam?: boolean;
  isOpenMic?: boolean;
  user_identifier?: string;
  hideIcon?: boolean;
  muted?: boolean;
}>();

const onClick = () => {
  emit("onPressDiv", props?.id);
};
</script>

<style scoped lang="scss">
.video-container {
  max-height: 400px;
  min-height: 150px;
  max-width: 400px;

  video {
    width: 100%;
    height: 100%;
  }
}

.video-container-mini {
  max-height: 200px;
  min-height: 120px;
  max-width: 200px;

  video {
    width: 100%;
    height: 100%;
  }
}

.video-container-solo {
  max-height: 300px;
  min-height: 140px;
  max-width: 300px;

  video {
    width: 100%;
    height: 100%;
  }
}

.video-container-for-sharing {
  max-height: 100%;
  border-radius: 0;

  video {
    width: 100%;
    height: 100%;
  }
}

video {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

video.unFlip {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}

.share-border {
  border: 2px solid rgb(174, 174, 174);
}
</style>
