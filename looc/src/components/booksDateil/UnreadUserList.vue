<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.id"
          :title="item.word"
          @click="clickWord(item)"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getUnreadUserList,
  getAlrRecUserList,
  getDonRecUserList,
} from "../../serve/api";
import { useStore } from "../../store/index";
import { Dialog } from "vant";
const props = defineProps(["type"]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const page_index = ref(0);
const route = useRoute();
const router = useRouter();
const list = ref([]);
const store = useStore();
let UserId = JSON.parse(localStorage.getItem("user")).id;
const onLoad = async () => {
  //下拉加载
  if (refreshing.value) {
    list.value = [];
    refreshing.value = false;
    page_index.value = 0;
  }
  let words;
  if (props.type === "Unread" || !props.type) {
    words = await getUnreadUserList({
      page_index: page_index.value,
      book: route.params.bookId,
      UserId: UserId,
    });
  } else if (props.type === "read") {
    words = await getAlrRecUserList({
      page_index: page_index.value,
      book: route.params.bookId,
      UserId: UserId,
    });
  } else if (props.type === "noread") {
    words = await getDonRecUserList({
      page_index: page_index.value,
      book: route.params.bookId,
      UserId: UserId,
    });
  }
  if (words.data.code === -200) {
    Dialog.confirm({
      title: "请登录",
      message: "你好没有登录，请去登录",
    })
      .then(() => {
        router.push({ path: "/login" });
      })
      .catch(() => {
        router.push({ path: "/home/reciteWords" });
      });
  } else {
    list.value = list.value.concat(words.data.data);
    page_index.value = page_index.value + 1;
    loading.value = false;
    if (list.value.length >= words.data.count) {
      finished.value = true;
    }
  }
};
watch(
  props.type,
  () => {
    onRefresh();
  },
  { deep: true }
);
const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
const clickWord = (item) => {
  store.$patch({
    nowWord: item,
  });

  router.push({
    path: "/wordDateil",
  });
};
</script>

<style></style>
