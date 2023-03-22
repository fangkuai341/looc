<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入单词库"
      @search="onSearch"
    />
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
          :title="item.name"
          @click="clickBook(item.id)"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getBooks } from "../../serve/api.js";
import { Dialog } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();
const value = ref("");
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const page_index = ref(0);
const propShow = ref(false);
const onLoad = async () => {
  //下拉加载
  if (refreshing.value) {
    list.value = [];
    refreshing.value = false;
    page_index.value = 0;
  }

  let books = await getBooks({ page_index: page_index.value });

  if (books.data.code === 200) {
    list.value = list.value.concat(books.data.data);
    page_index.value = page_index.value + 1;
    loading.value = false;
    if (list.value.length >= books.data.count) {
      finished.value = true;
    }
  }
};
const clickBook = (id) => {
  router.push({ path: `/bookDateil/${id}` });
};
const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
</script>

<style></style>
