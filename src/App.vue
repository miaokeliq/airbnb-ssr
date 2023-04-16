<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";

const { locale: localeLanguage } = useI18n();
const { t } = useI18n();
const router = useRouter();

const locale = ref(zhCn);
const changeLang = (language: any) => {
  locale.value = language;
  localeLanguage.value = language.name;
  console.log(language);
};
</script>

<template>
  <el-config-provider :locale="zhCn">
    <button @click="() => router.push({ path: '/home' })">首页</button>
    <button @click="() => router.push({ path: '/mine' })">个人中心</button>
    <button @click="changeLang(en)">英文</button>
    <button @click="changeLang(zhCn)">中文</button>
    <router-link to="/home">首页</router-link>

    <router-link to="/mine">个人中心</router-link>
    <router-view />
  </el-config-provider>
</template>

<style scoped lang="scss"></style>
