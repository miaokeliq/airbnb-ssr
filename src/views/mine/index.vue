<template>
  {{ t("message.mine") }}
  <button @click="() => router.push({ name: 'home', query: { id: 2 } })">
    跳转到首页
  </button>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
</script>

<style></style>
