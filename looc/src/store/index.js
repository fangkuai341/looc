import { defineStore } from "pinia";

//定义状态容器和状态
//修改state
//仓库中的action的使用
export const useStore = defineStore("main", {
  state: () => {
    return {
      nowWord: {},
    };
  },
  getters: {
    getNowWord() {
      return this.obj;
    },
  },
  actions: {
    setNowWord(nowWord) {
      this.nowWord = nowWord;
    },
  },
});
