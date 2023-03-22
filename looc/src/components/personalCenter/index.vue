<template>
  <div>
    <img src="../../assets/img/img.jpg" style="width: 100vw" />
    <div class="personalCenter">
      <div @click="login">请登录(点我登录)</div>
      <div class="personalCenter-mid">
        <div>我的收藏</div>
        <div>联系作者</div>
        <div style="color: #ccc">本期更新内容</div>
        <div>提供单词库</div>
      </div>
      <div class="feed-author">投喂作者</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const login = () => {
  router.push({ path: "/login" });
};
</script>

<style lang="less" scoped>
.personalCenter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  margin-top: 10px;
}
.personalCenter-mid {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 15px;
  width: 100%;
  div {
    margin-top: 10px;
    border-bottom: 1px solid #ccc;
    width: 100%;
    text-align: initial;
  }
}
.feed-author {
  margin-top: 20px;
  color: #ccc;
  text-align: center;
  width: 100%;
}
</style>
