<script setup lang="ts">
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import commonHeader from "./components/layout/commonHeader.vue";
import commonFooter from "./components/layout/commonFooter.vue";

const { locale: localeLanguage } = useI18n();
// const { t } = useI18n();
const route = useRoute();

console.log(route);
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
    <commonHeader
      v-show="!route.fullPath.indexOf('login')"
      @changeLang="changeLang"
    />
    <!-- 主体 -->
    <div class="container"><router-view /></div>
    <!-- 底部 -->
    <commonFooter
      v-show="!route.fullPath.indexOf('login')"
      @changeLang="changeLang"
    />
  </el-config-provider>
</template>

<style lang="scss">
.container {
  min-height: calc(100vh - 402px);
}
</style>
