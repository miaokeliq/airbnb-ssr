<template>
  <div class="header-common">
    <img src="../../assets/images/layout/logo.png" class="logo" />
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="orders">{{ t("header.orders") }}</el-menu-item>
      <el-menu-item index="records">{{ t("header.records") }}</el-menu-item>
      <el-sub-menu index="language">
        <template #title>{{ t("header.language") }}</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">English</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="avatar">
        <img
          src="../../assets/images/layout/avatar.jpg"
          alt="个人中心"
          class="avatar"
        />
      </el-menu-item>
      <el-menu-item index="login">
        {{ t("login.loginTab") }} / {{ t("login.signTab") }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import { ref, defineEmits } from "vue";
import { saveLanguageApi, fetchLanguageApi } from "../../api/layout";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const { t } = useI18n();
const activeIndex = ref("orders");

const router = useRouter();
const emit = defineEmits<{
  (e: "changeLang", language: any): void;
}>();
function handleSelect(e: any) {
  if (e === "zh") {
    emit("changeLang", zhCn);
    saveLanguage("zh");
  } else if (e === "en") {
    emit("changeLang", en);
    saveLanguage("en");
  } else if (e === "login") {
    router.push({ name: "login" });
  }
}

// Mock 接口： 保存当前语言包
function saveLanguage(language: any) {
  saveLanguageApi(language).then((res) => {
    let { success } = res;
    if (success) {
      console.log("保存当前语言包成功");
    }
  });
}

function getLanguage() {
  fetchLanguageApi().then((res: any) => {
    const { success, result } = res;
    const { name } = result;
    if (success) {
      if (name === "zh") {
        emit("changeLang", zhCn);
      } else if (name === "en") {
        emit("changeLang", en);
      }
      console.log("获取当前语言包成功");
    }
  });
}

getLanguage();
</script>

<style scoped lang="scss">
@import "@/assets/scss/layout/commonHeader.scss";
</style>
