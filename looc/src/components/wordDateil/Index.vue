<template>
  <div class="wordDateil">
    <van-nav-bar
      title="单词"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div style="padding-bottom: 90px">
      <div class="titWord">
        <div class="word">{{ obj.word }}</div>
        <div style="margin-top: 5px">{{ obj.interpretation }}</div>
        <div>
          <div style="display: flex; color: #999; margin-top: 5px">
            <div>美音</div>
            <div style="margin: 0 5px">{{ obj.meiyin }}</div>
            <img
              src="../../assets/img/suona.png"
              style="width: 20px"
              @click="apeak"
            />
          </div>
          <div style="display: flex; color: #999; margin-top: 5px">
            <div>英音</div>
            <div style="margin: 0 5px">{{ obj.englishPronunciation }}</div>
            <img src="../../assets/img/suona.png" style="width: 20px" />
          </div>
        </div>
      </div>
      <div class="exampleSentences">
        <div class="title">
          <div>例句</div>
          <div style="color: #66ccff">上传例句</div>
        </div>
        <div class="line"></div>
        <div v-if="!obj.exampleSentences">
          <div class="content-font">上传例句</div>
          <div>
            将你使用的例句上传looc，您的帮助会让您的例句让所以用户使用。
          </div>
        </div>
        <div
          v-else
          v-for="(item, index) in JSON.parse(obj.exampleSentences)"
          :key="index"
          class="content"
        >
          <div>{{ item.E }}</div>
          <div>{{ item.F }}</div>
        </div>
      </div>
      <div class="helpMemory">
        <div class="title">
          <div>助记</div>
          <div style="color: #66ccff">上传助记</div>
        </div>
        <div class="line"></div>
        <div v-if="!obj.helpMemory">
          <div class="content-font">上传助记</div>
          <div>
            将你使用的助记上传looc，您的帮助会让您的助记让所以用户使用。
          </div>
        </div>
        <div
          v-else
          v-for="(item, index) in JSON.parse(obj.helpMemory)"
          :key="index"
          class="content"
        >
          <div>{{ item }}</div>
        </div>
      </div>
    </div>
    <div class="moveButtons">
      <van-button type="primary">加入收藏</van-button>
      <van-button type="primary">转入已背</van-button>
      <van-button type="primary">不用背</van-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "../../store/index";
import axios from "axios";
const store = useStore();

const obj = computed(() => store.nowWord);
const onClickLeft = () => {
  history.back();
};
const apeak = () => {
  axios({
    url: "http://localhost:3000/dictvoice?type=0&audio=dispassionate",
    responseType: "blob", // 指定响应数据类型为 blob
  }).then((response) => {
    const audio = new Audio(URL.createObjectURL(response.data)); // 将 blob 转为 URL
    audio.play();
  });
};
onMounted(() => {
  console.log(obj);
});
</script>

<style scoped lang="less">
.wordDateil {
  background: #eee;
  height: 100%;
  min-height: 100vh;
  .exampleSentences,
  .helpMemory {
    margin-top: 5px;
    padding: 10px;
    background: #fff;
    min-height: 150px;
    margin: 10px auto 0;
    border-radius: 8px;
    width: 90vw;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .line {
    height: 1px;
    width: calc(100% + 20px);
    background: #999;
    transform: translateX(-10px);
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
    div {
      width: 100%;
      word-wrap: break-word;
      text-align: initial;
    }
  }
  .content-font {
    margin-top: 20px;
    border: 1px solid #1a6488;
    height: 60px;
    line-height: 60px;
    border-radius: 33px;
    color: #1a6488;
  }
  .titWord {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    background: #fff;
    margin: 5px auto 0;
    border-radius: 8px;
    width: 90vw;
    .word {
      font-size: 25px;
      font-weight: 700;
    }
  }
}
.moveButtons {
  padding: 10px 0;
  background: #fff;
  display: flex;
  justify-content: space-around;
  width: 100vw;
  position: fixed;
  top: calc(100% - 64px);
}
</style>
