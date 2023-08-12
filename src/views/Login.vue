<template lang="">
  <main class="flex flex-row w-full h-screen">
    <div
      class="sm:w-1/2 w-full h-full flex flex-col items-center px-5 sm:px-8 md:px-11 lg:px-14 py-20"
    >
      <div class="self-start w-full flex flex-row items-center justify-between">
        <img :src="LogoImage" alt="" class="w-36" />
        <router-link to="/">
          <img :src="ArrowLeftBackImage" alt="" class="w-8" />
        </router-link>
      </div>
      <div
        class="m-auto w-full lga:w-1/2 py-8 px-5 flex flex-col justify-center items-center"
      >
        <p class="text-md lga:text-2xl font-semibold text-gray-500 mb-5">
          Signin to Leiger now
        </p>
        <div class="flex flex-row gap-5 mb-10">
          <button
            class="px-2 py-1 drop-shadow-md duration-500 transform active:scale-75 transition-transform bg-white rounded-md"
          >
            <img :src="GoogleAuth" alt="" class="w-8" />
          </button>
          <button
            class="px-2 py-1 drop-shadow-md duration-500 transform active:scale-75 transition-transform bg-white rounded-md"
          >
            <img :src="FBAuth" alt="" class="w-9" />
          </button>
          <button
            class="px-2 py-1 drop-shadow-md duration-500 transform active:scale-75 transition-transform bg-white rounded-md"
          >
            <img :src="GithubAuth" alt="" class="w-8" />
          </button>
        </div>
        <p class="w-full text-gray-400 text-xs text-center mb-8">
          Or continue using your custom E-mail
        </p>
        <label
          for=""
          class="self-start text-xs font-semibold text-gray-400 mb-2"
          >Email</label
        >
        <TextInput class="w-full" placeholder="@mail.com" />
        <label
          for=""
          class="self-start text-xs font-semibold text-gray-400 mb-2 mt-4"
          >Password</label
        >
        <TextInput class="w-full" placeholder="Password" type="password" />
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full self-start mt-4"
        >
          <div class="flex flex-row items-center">
            <input type="checkbox" />
            <small class="ml-1 font-light text-gray-400">Remember Me</small>
          </div>
          <a href="" class="text-blue-500 text-xs font-normal"
            >Forgot Password?</a
          >
        </div>
        <button
          class="mt-4 px-4 py-2 w-full text-xs text-white drop-shadow-md duration-500 transform active:scale-75 transition-transform bg-blue-500 rounded-sm"
        >
          SIGN IN
        </button>
      </div>
    </div>
    <div
      class="w-1/2 h-full sm:flex flex-col justify-center items-center bg-gray-800 px-12 hidden"
    >
      <div class="m-auto w-full">
        <p class="text-gray-500 text-2xl text-center">
          Don't know where to start? Or need some tutorial?
        </p>
        <p class="text-gray-200 font-semibold text-xl text-center mb-10">
          WE COVERED YOU!!
        </p>
        <div
          class="flex flex-col lg:flex-row w-full justify-between mt-6 gap-3"
        >
          <div class="w-full flex flex-col items-center justify-center gap-2">
            <div class="py-3 px-3 rounded-full w-16 bg-blue-50">
              <img :src="GatherImage" alt="" class="w-11" />
            </div>
            <p class="text-gray-400 text-sm text-center">GATHER INFORMATION</p>
          </div>
          <div class="w-full flex flex-col items-center justify-center gap-2">
            <div class="py-3 px-3 rounded-full w-16 bg-cyan-200">
              <img :src="WorkingImage" alt="" class="w-12" />
            </div>
            <p class="text-gray-400 text-sm text-center">DO IT NOW</p>
          </div>
          <div class="w-full flex flex-col items-center justify-center gap-2">
            <div class="py-3 px-3 rounded-full w-16 bg-green-200">
              <img :src="ReadyToGoImage" alt="" class="w-12" />
            </div>
            <p class="text-gray-400 text-sm text-center">AND READY TO GO</p>
          </div>
        </div>
        <div
          class="flex flex-row justify-between items-start w-full mt-10 px-9"
        >
          <button
            class="disabled flex flex-row items-center justify-center bg-blue-100 rounded-md py-1 px-1 gap-2 cursor-not-allowed"
          >
            <img :src="ArrowImage" alt="" class="w-4 rotate-180" />
            <p class="text-xs text-gray-400">PREVIOUS</p>
          </button>
          <button
            class="disabled flex flex-row items-center justify-center bg-blue-300 rounded-md py-1 px-1 gap-2 duration-500 transform active:scale-75 transition-transform"
          >
            <p class="text-xs text-gray-800">NEXT</p>
            <img :src="ArrowImage" alt="" class="w-4" />
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import TextInput from "@/components/TextInput.vue";
import LogoImage from "@/assets/images/logo-no-background.png";
import ArrowLeftBackImage from "@/assets/images/arrow-left-back.png";
import FBAuth from "@/assets/images/fb-auth.png";
import GoogleAuth from "@/assets/images/google-auth.png";
import GithubAuth from "@/assets/images/github-auth.png";
import GatherImage from "@/assets/images/gather.png";
import WorkingImage from "@/assets/images/working.png";
import ReadyToGoImage from "@/assets/images/finish.png";
import ArrowImage from "@/assets/images/arrow.png";
</script>

<style lang="scss"></style>
