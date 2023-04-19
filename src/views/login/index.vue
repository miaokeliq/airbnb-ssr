<template>
  <div class="login-page">
    <div class="left-part"></div>
    <div class="right-part">
      <div class="login-panel">
        <!-- tabs -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录" name="login"></el-tab-pane>
          <el-tab-pane label="注册" name="sign"></el-tab-pane>
        </el-tabs>
        <!-- 表单组件 -->
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
          <el-form-item prop="mobile">
            <el-input
              placeholder="请输入正确的手机号"
              v-model="ruleForm.mobile"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入正确的密码"
              v-model="ruleForm.password"
            />
          </el-form-item>

          <el-form-item>
            <el-button class="login-btn" @click="submitForm">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ref, reactive } from "vue";
const router = useRouter();
const route = useRoute();
const ruleFormRef = ref();
const ruleForm = reactive({
  mobile: "",
  password: "",
});

const rules = reactive({
  mobile: [
    {
      required: true,
      min: 11,
      max: 11,
      message: "请输入正确的手机号码",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入正确的密码",
      trigger: "blur",
    },
  ],
});
const activeName = ref("login");

function handleClick(e: any) {
  console.log(e);
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
console.log(route.query);
</script>

<style lang="scss">
@import "@/assets/scss/login/index.scss";
</style>
