<template>
  <div class="login-page">
    <div class="left-part"></div>
    <div class="right-part">
      <div class="login-panel">
        <!-- tabs -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="t('login.loginTab')" name="login"></el-tab-pane>
          <el-tab-pane :label="t('login.signTab')" name="sign"></el-tab-pane>
        </el-tabs>
        <!-- 表单组件 -->
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
          <el-form-item prop="mobile">
            <el-input
              :placeholder="t('login.placeMobile')"
              v-model="ruleForm.mobile"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :placeholder="t('login.placePass')"
              v-model="ruleForm.password"
            />
          </el-form-item>

          <el-form-item>
            <el-button class="login-btn" @click="submitForm">{{
              loginText
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
interface IRuleForm {
  mobile: string;
  password: string;
}

const { t } = useI18n();
const loginText = ref(t("login.loginBtn"));
const ruleFormRef = ref();
const ruleForm: IRuleForm = reactive({
  mobile: "",
  password: "",
});
const rules = reactive({
  mobile: [
    {
      required: true,
      min: 11,
      max: 11,
      message: t("login.placeMobile"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: t("login.placePass"),
      trigger: "blur",
    },
  ],
});
const activeName = ref("login");

function handleClick(e: any) {
  console.log(e);
  let { name, label } = e.props;
  if (name === "login") {
    loginText.value = t("login.loginBtn");
  } else if (name === "sign") {
    loginText.value = t("login.signBtn");
  }
  console.log(name, label);
}

function submitForm() {
  ruleFormRef.value.validate((valid: any) => {
    if (valid) {
      alert("成功");
    } else {
      return false;
    }
  });
}
</script>

<style lang="scss">
@import "@/assets/scss/login/index.scss";
</style>
