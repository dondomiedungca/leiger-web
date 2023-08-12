<template lang="">
  <Navbar />
  <section class="flex flex-row px-5 sm:px-8 md:px-11 lg:px-14 gap-3 mt-10">
    <div class="left-side sm:w-1/2 w-full">
      <p class="md:text-4xl text-2xl text-gray-500 intro leading-tight">
        Leiger offer a both
        <span class="bg-blue-400 text-white rounded-md px-2 py-0">FREE</span>
        and paid version for video conference application that suits for your
        needs.
      </p>
      <div class="quick-connect mt-16 text-lg flex flex-col gap-3">
        <p class="text-gray-700">Get into Meeting now</p>
        <TextInput class="md:w-1/2 w-full" placeholder="Room ID" />
        <TextInput
          class="md:w-1/2 w-full"
          placeholder="Password"
          type="password"
        />
        <button
          class="px-4 py-2 md:w-1/2 w-full text-xs text-gray-600 drop-shadow-md duration-500 transform active:scale-75 transition-transform bg-blue-50 rounded-lg"
        >
          CONNECT NOW
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
    class="bg-blue-50 w-full flex flex-col sm:flex-row justify-between px-5 sm:px-8 md:px-11 lg:px-14 py-7 mt-5 gap-3"
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
      class="sm:order-2 order-3 flex flex-col sm:justify-between mt-10 sm:mt-0"
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
        <a href="" class="text-xs font-semibold"> ROADMAP </a>
        <a href="" class="text-xs font-semibold"> ABOUT US </a>
        <a href="" class="text-xs font-semibold"> DEVELOPERS </a>
      </div>
    </div>
  </section>
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
</script>

<style lang="scss">
.intro {
  font-family: "Oxygen", sans-serif !important;
}
</style>
