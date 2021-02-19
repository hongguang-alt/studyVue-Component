<template>
  <input
    :value="currentValue"
    type="text"
    class="border-gray-200 border-solid border-2 rounded-lg ml-2"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import emitter from "../../mixins/emitter";
export default {
  name: "iInput",
  mixins: [emitter],
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
  },
  methods: {
    handleInput(e) {
      const value = e.target.value;
      this.currentValue = value;
      this.$emit("input", value);
      this.dispatch("iFormItem", "on-form-change", value);
    },
    handleBlur() {
      this.dispatch("iFormItem", "on-form-blur", this.currentValue);
    },
  },
};
</script>

<style></style>
