<template>
  <div class="titAndLogin">
    <div class="title">LOOC</div>
    <div class="login">
      <div style="display: flex; align-items: center; justify-content: center">
        <div style="width: 100px">用户名：</div>
        <input
          type="text"
          placeholder="请输入用户名"
          v-model="name"
          @focus="focusFun($event)"
          @blur="blurFun($event)"
        />
      </div>
      <div style="display: flex; align-items: center; justify-content: center">
        <div style="width: 100px">密码：</div>
        <input
          type="password"
          style="margin-top: 10px"
          placeholder="请输入密码"
          v-model="passWord"
          @focus="focusFun($event)"
          @blur="blurFun($event)"
        />
      </div>
      <div
        style="display: flex; align-items: center; justify-content: center"
        v-if="isRegister"
      >
        <div style="width: 100px">再输入<br />一遍密码：</div>
        <input
          type="password"
          style="margin-top: 10px"
          placeholder="请再输入一遍密码"
          v-model="twoPassWord"
          @focus="focusFun($event)"
          @blur="blurFun($event)"
        />
      </div>
    </div>
    <van-button
      round
      type="success"
      :loading="loading"
      class="loginButton"
      @click="loginAndRegister"
      >{{ isRegister ? "注 册" : "登 录" }}</van-button
    >
    <div
      style="color: #ccc; font-size: 14px; margin-top: 10px"
      @click="samllFontClick"
      v-if="!isRegister"
    >
      还没有账号，点击注册
    </div>
    <div
      style="color: #ccc; font-size: 14px; margin-top: 10px"
      @click="isRegister = false"
      v-else
    >
      返回登录
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { register, login } from "../../serve/api.js";
import { Notify } from "vant";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import md5 from "md5";
const isRegister = ref(false);
const loading = ref(false);
const name = ref();
const passWord = ref();
const twoPassWord = ref();
const router = useRouter();
//聚焦
const focusFun = (e) => {
  e.target.style.borderColor = "#4e6ef2";
};
//失焦
const blurFun = (e) => {
  e.target.style.borderColor = "#000";
};
//登录和注册
const loginAndRegister = async () => {
  loading.value = true;
  if (isRegister.value) {
    //注册
    if (!name.value || !passWord.value || !twoPassWord.value) {
      Notify({ type: "danger", message: "请输入用户名或密码" });
      return;
    }
    if (passWord.value !== twoPassWord.value) {
      Notify({ type: "danger", message: "两次密码不一致" });
      return;
    }
    let data = await register({ name: name.value, pwd: md5(passWord.value) });
    if (data.data.code === 200) {
      Toast.success("注册成功");
    } else {
      Toast.fail("注册失败");
    }
  } else {
    let data = await login({ name: name.value, pwd: md5(passWord.value) });
    if (data.data.code === 200) {
      localStorage.setItem("user", JSON.stringify(data.data.data[0]));
      Toast.success("登录成功");
      router.go(-1);
    } else {
      Toast.fail("登录失败");
    }
  }
  loading.value = false;
};
const samllFontClick = () => {
  isRegister.value = !isRegister.value;
  name.value = "";
  passWord.value = "";
  twoPassWord.value = "";
};
</script>

<style lang="less" scoped>
.titAndLogin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
}
.title {
  font-family: "myFont";
  font-weight: 900;
  font-size: 60px;
  letter-spacing: 20px;

  -webkit-text-stroke: 1px #66ccff;
  color: transparent;
}
input {
  height: 30px;
  border-radius: 32px;
  border: 1px solid #000;
  padding: 0 20px;
}
.login {
  margin-top: 20px;
}
.loginButton {
  width: 250px;
  margin-top: 25px;
}
</style>
