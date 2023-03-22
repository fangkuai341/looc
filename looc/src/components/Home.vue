<template>
  <div>
    <router-view />
    <van-tabbar route v-model="active">
      <van-tabbar-item
        replace
        icon="home-o"
        name="reciteWords"
        to="/home/reciteWords"
        >背单词</van-tabbar-item
      >
      <van-tabbar-item
        replace
        icon="friends-o"
        name="personalCenter"
        to="/home/personalCenter"
        >个人中心</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from "vue";
const active = ref("reciteWords");
</script>

<style></style>
