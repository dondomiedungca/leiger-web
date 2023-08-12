<template lang="">
  <div
    class="px-5 sm:px-8 md:px-11 lg:px-14 flex flex-row justify-between items-center w-full h-16 md:h-28"
  >
    <div class="flex flex-row gap-2 items-center">
      <img :src="LogoImage" class="w-32 sm:w-32 md:w-32 lg:w-56 mr-10" />
      <button
        class="border-2 border-blue-400 text-gray-800 text-xs h-7 px-3 rounded-lg hidden md:block"
      >
        PRICING
      </button>
      <button
        class="border-2 border-blue-400 text-gray-800 text-xs h-7 px-3 rounded-lg hidden md:block"
      >
        COMPANY
      </button>
    </div>
    <div class="flex flex-row gap-3">
      <button
        class="text-center border-0 bg-blue-500 text-white px-5 py-2 text-xs rounded-full hidden md:block"
      >
        GET STARTED FOR FREE
      </button>
      <button
        class="text-center border-2 border-blue-500 text-gray-800 px-5 py-2 text-xs rounded-full duration-300 hover:bg-blue-500 hover:text-white hidden md:block"
      >
        TRY OUR PREMIUM
      </button>
      <button
        @click="handleToggle"
        class="block md:hidden border-2 border-blue-300 p-1 rounded group"
      >
        <img
          :src="TogglerImage"
          alt=""
          :class="`h-5 duration-300 ${isToggled ? 'rotated' : ''}`"
        />
      </button>
    </div>
  </div>
  <div
    :class="`mobile-navbar md:hidden w-full flex flex-col px-5 gap-2 overflow-y-hidden bg-gray-100 ${
      isToggled ? 'expanded' : ''
    }`"
  >
    <a href="" class="text-xs mt-3">PRICING</a>
    <a href="" class="text-xs">COMPANY</a>
    <a
      href=""
      class="mt-3 border-0 bg-blue-500 text-white px-5 py-2 text-xs rounded-full text-center"
      >GET STARTED FOR FREE</a
    >
    <a
      href=""
      class="text-xs border-2 duration-300 hover:bg-blue-500 hover:text-white border-blue-500 pt-1 pb-1 px-2 text-center rounded-full mb-3"
      >TRY OUR PREMIUM</a
    >
  </div>
</template>

<script lang="ts">
import Logo from "@/assets/images/logo-no-background.png";
import Toggler from "@/assets/images/toggler.png";
import { ref } from "vue";

export default {
  setup() {
    const LogoImage = ref(Logo);
    const TogglerImage = ref(Toggler);
    const isToggled = ref(false);

    const handleToggle = () => {
      isToggled.value = !isToggled.value;
    };

    return { LogoImage, TogglerImage, handleToggle, isToggled };
  },
};
</script>

<style lang="scss">
.rotated {
  transform: rotate(180deg);
}

.mobile-navbar {
  transition: height 200ms;
  height: 0px;
}

.expanded {
  height: auto;
}
</style>
