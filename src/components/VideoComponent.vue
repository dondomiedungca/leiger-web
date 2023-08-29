<template lang="">
  <div
    :class="`${
      overrideClass
        ? classes
        : 'video-player-box mb-1 border-2 border-blue-400 rounded-md h-44 min-w-max relative ' +
          classes
    }`"
  >
    <div
      class="absolute z-10 bottom-0 left-0 w-full flex flex-row gap-8 items-center"
    >
      <div class="relative">
        <fa
          v-if="showIcons"
          :class="`text-white absolute bottom-2 left-2 ${
            !isOpenMic ? 'bg-red-500' : 'bg-blue-500'
          } p-1 rounded-md`"
          :icon="`fa-solid ${
            !isOpenMic ? 'fa-microphone-slash' : 'fa-microphone'
          }`"
        />
      </div>
      <div class="relative">
        <fa
          v-if="showIcons"
          :class="`ml-2 text-white absolute bottom-2 ${
            !isOpenCam ? 'bg-red-500' : 'bg-blue-500'
          } p-1 rounded-md`"
          :icon="`fa-solid ${!isOpenCam ? 'fa-video-slash' : 'fa-video'}`"
        />
      </div>
    </div>
    <video
      class="video-player aspect-video bg-black"
      :srcObject="props.srcObject"
      :id="props.id"
      autoplay
      playsinline
    ></video>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  srcObject: MediaStream;
  id?: string;
  overrideClass?: boolean;
  classes?: string;
  showIcons?: boolean;
  isOpenCam?: boolean;
  isOpenMic?: boolean;
}>();
</script>

<style scoped lang="scss">
.video-player {
  width: 100%;
  height: 100%;
}

video {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
