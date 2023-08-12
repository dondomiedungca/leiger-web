<template lang="">
  <div
    class="px-5 sm:px-8 md:px-11 lg:px-14 flex flex-row justify-between items-center w-full h-16 md:h-28"
  >
    <div class="flex flex-row gap-2 items-center">
      <router-link to="/">
        <img :src="LogoImage" class="w-32 sm:w-32 md:w-32 lg:w-56 mr-10" />
      </router-link>
      <button
        class="border-2 border-blue-400 text-gray-800 text-xs h-7 px-3 rounded-lg hidden mda:block"
      >
        PRICING
      </button>
      <button
        class="border-2 border-blue-400 text-gray-800 text-xs h-7 px-3 rounded-lg hidden mda:block"
      >
        COMPANY
      </button>
    </div>
    <div class="flex flex-row gap-3 items-center">
      <button
        class="text-center border-0 bg-blue-500 text-white px-5 py-2 text-xs rounded-full hidden mda:block"
      >
        GET STARTED FOR FREE
      </button>
      <button
        class="text-center border-2 border-blue-500 text-gray-800 px-5 py-2 text-xs rounded-full duration-300 hover:bg-blue-500 hover:text-white hidden mda:block"
      >
        TRY OUR PREMIUM
      </button>
      <router-link
        to="/login"
        class="border-2 border-blue-400 text-gray-800 text-xs h-9 px-3 rounded-xl justify-center hidden mda:flex flex-row items-center"
      >
        <img :src="LoginArrowIImage" alt="" class="w-6" />
        LOGIN
      </router-link>
      <button
        @click="handleToggle"
        class="block mda:hidden border-2 border-blue-300 p-1 rounded group"
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
    :class="`mobile-navbar mda:hidden w-full flex flex-col px-5 gap-2 overflow-y-hidden bg-gray-100 ${
      isToggled ? 'expanded' : ''
    }`"
  >
    <a href="" class="text-xs mt-3">PRICING</a>
    <a href="" class="text-xs">COMPANY</a>
    <a
      href=""
      class="mt-3 border-0 bg-blue-500 text-white px-5 py-2 text-xs rounded-full text-center xs:w-1/2"
      >GET STARTED FOR FREE</a
    >
    <a
      href=""
      class="text-xs border-2 duration-300 hover:bg-blue-500 hover:text-white border-blue-500 pt-1 pb-1 px-2 text-center rounded-full xs:w-1/2"
      >TRY OUR PREMIUM</a
    >
    <router-link
      to="/login"
      class="border-2 border-blue-400 text-gray-800 text-xs justify-center h-9 px-3 rounded-xl flex flex-row items-center mb-3 xs:w-1/3"
    >
      <img :src="LoginArrowIImage" alt="" class="w-6" />
      LOGIN
    </router-link>
  </div>
</template>

<script lang="ts">
import Logo from "@/assets/images/logo-no-background.png";
import LoginArrowIImage from "@/assets/images/login-arrow.png";
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

    return {
      LogoImage,
      TogglerImage,
      LoginArrowIImage,
      handleToggle,
      isToggled,
    };
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
