import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home.vue";
import reciteWords from "../components/reciteWords/index.vue";
import personalCenter from "../components/personalCenter/index.vue";
import Login from "../components/login/Login.vue";
import bookDateil from "../components/booksDateil/index.vue";
import wordDateil from "../components/wordDateil/Index.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: Home,
      redirect: "home/reciteWords",
      children: [
        {
          path: "reciteWords",
          component: reciteWords,
        },
        {
          path: "personalCenter",
          component: personalCenter,
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/bookDateil/:bookId",
      component: bookDateil,
    },
    {
      path: "/wordDateil",
      component: wordDateil,
    },
  ],
});
export default router;
