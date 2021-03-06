<template>
  <div class="flex justify-center items-center mt-2">
    <label v-if="label" :class="{ 'i-form-item-label-reqired': isRequired }">{{
      label
    }}</label>
    <div>
      <slot></slot>
    </div>
    <div v-if="validateState === 'error'" class="i-form-item-message">
      {{ validateMessage }}
    </div>
  </div>
</template>

<script>
import emitter from "../../mixins/emitter";
import AsyncValidator from "async-validator";
export default {
  name: "iFormItem",
  mixins: [emitter],
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      //是否为必填
      isRequired: false,
      //校验状态
      validateState: "",
      validateMessage: "",
    };
  },
  methods: {
    setRules() {
      let rules = this.getRules();
      if (rules.length) {
        rules.every((rule) => {
          this.isRequired = rule.required;
        });
      }
      this.$on("on-form-blur", this.onFildBlur);
      this.$on("on-form-change", this.onFieldChange);
    },
    getRules() {
      //获取当前的组件规则
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },
    resetFields() {
      this.validateState = "";
      this.validateMessage = "";
      //直接在下方，修改数据，通过provide传递下来的值
      this.form.model[this.prop] = this.initalValue;
    },
    //过滤出规则不符合的
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(
        (rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },
    //校验数据
    validate(trigger, callback = function() {}) {
      let rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        return true;
      }
      this.validateState = "validating";
      let descriptor = {};
      descriptor[this.prop] = rules;
      const validator = new AsyncValidator(descriptor);
      let model = {};
      model[this.prop] = this.fieldValue;
      validator.validate(model, { firstFields: true }, (errors) => {
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";
        callback(this.validateMessage);
      });
    },
    onFildBlur() {
      this.validate("blur");
    },
    onFieldChange() {
      this.validate("change");
    },
  },
  mounted() {
    //向上派发自己
    if (this.prop) {
      this.dispatch("iForm", "on-form-item-add", this);
      //设置初始值
      this.initalValue = this.fieldValue;
      this.setRules();
    }
  },
  computed: {
    //获取form中的信息
    fieldValue() {
      return this.form.model[this.prop];
    },
  },
  beforeDestroy() {
    this.dispatch("iForm", "on-form-item-remove", this);
  },
};
</script>

<style>
.i-form-item-label-required::before {
  content: "*";
  color: red;
}
.i-form-item-message {
  color: red;
}
</style>
