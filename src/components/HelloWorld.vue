<template>
  <div>
    <h1>测试form表单</h1>
    <i-form :model="formValidate" :rules="ruleValidate" ref="form">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name" />
      </i-form-item>
      <i-form-item label="邮箱" prop="email">
        <i-input v-model="formValidate.email" />
      </i-form-item>
    </i-form>
    <button class="btn btn-green" @click="handleSubmit">提交</button>
    <button class="btn-blue" @click="handleReset">重置</button>
    <h1>测试checkbox</h1>
    <i-checkbox-group v-model="multiple">
      <i-checkbox label="option1">选项 1</i-checkbox>
      <i-checkbox label="option2">选项 2</i-checkbox>
      <i-checkbox label="option3">选项 3</i-checkbox>
      <i-checkbox label="option4">选项 4</i-checkbox>
    </i-checkbox-group>
    <h1>测试display</h1>
    <i-display :code="code"></i-display>
    <button class="btn-blue" @click="handleAlert">这是一个按钮Alert</button>
    <h1>测试table表格</h1>
    <Table />
  </div>
</template>

<script>
import form from "./form/form";
import formItem from "./form/form-item";
import input from "./form/input";
import checkbox from "./checkbox/checkbox";
import checkboxgroup from "./checkbox/checkbox-group";
import display from "./display/display";
import defaultCode from "./default-code.js";
import Table from "./table-render/table-render.vue";
export default {
  inject: ["message"],
  name: "HelloWorld",
  components: {
    iForm: form,
    iFormItem: formItem,
    iInput: input,
    iCheckbox: checkbox,
    iCheckboxGroup: checkboxgroup,
    iDisplay: display,
    Table,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      formValidate: {
        name: "",
        email: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
      },
      multiple: ["option1", "option3"],
      code: defaultCode,
    };
  },
  methods: {
    handleSubmit() {
      console.log("点击了form");
      this.$refs.form.validate((valid) => {
        if (valid) {
          window.alert("提交成功");
        } else {
          window.alert("表单校验失败");
        }
      });
    },
    handleReset() {
      this.$refs.form.resetFields();
    },
    handleAlert() {
      this.$Alert.info({
        content: "这是一个消息通知",
        duration: 1.5,
      });
    },
  },
};
</script>

<style scoped>
.btn {
  @apply py-2  font-semibold rounded-lg shadow-md;
}
.btn-green {
  @apply text-white bg-green-500 hover:bg-green-700;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
