<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import headerCommon from "./components/layout/headerCommon.vue";

const { locale: localeLanguage } = useI18n();
// const { t } = useI18n();
// const router = useRouter();

const locale = ref(zhCn);
const changeLang = (language: any) => {
  locale.value = language;
  localeLanguage.value = language.name;
  console.log(language);
};
</script>

<template>
  <el-config-provider :locale="locale">
    <!-- 头部 -->
    <headerCommon @changeLang="changeLang" />
    <!-- 主体 -->
    <router-view />
  </el-config-provider>
</template>

<style scoped lang="scss"></style>
