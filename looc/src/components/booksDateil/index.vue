<template>
  <div>
    <van-search v-model="value" show-action placeholder="请输入单词" />
    <van-tabs v-model:active="active" sticky :offset-top="50">
      <van-tab title="未背"><UnreadUserList type="Unread" /> </van-tab>
      <van-tab title="已背"> <UnreadUserList type="read" /> </van-tab>
      <van-tab title="不背"> <UnreadUserList type="noread" /> </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import UnreadUserList from "./UnreadUserList.vue";
const active = ref(0);
const value = ref("");
</script>

<style scoped lang="less">
/deep/ .van-search--show-action {
  position: fixed;
  top: 0px;
  z-index: 99;
  width: 100vw;
}
/deep/.van-tabs__content {
  margin-top: 50px;
}
</style>
