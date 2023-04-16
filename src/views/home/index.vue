<template>
  {{ t("message.home") }}
  <button @click="() => router.push({ path: '/mine', query: { id: 1 } })">
    跳转到个人中心
  </button>
  <el-button>elementbutton</el-button>
  <el-date-picker v-model="value1" type="date" placeholder="Pick a day">
  </el-date-picker>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";
import { fetchElephant } from "../../api";
import { useI18n } from "vue-i18n";
import IndexedDB from "../../utils/indexedDB";
const { t } = useI18n();
let { proxy }: any = getCurrentInstance();
const router = useRouter();

// 数据库相关操作

const value1 = "";

// 真实接口
function getELephant() {
  fetchElephant().then((res) => {
    console.log(res);
  });
}
getELephant();
</script>

<style scoped lang="scss">
@import "@/assets/scss/home/index.scss";
</style>
