<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from "../../utils";
import emitter from "../../mixins/emitter";
export default {
  name: "iCheckboxGroup",
  mixins: [emitter],
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    updateModel(update) {
      this.childrens = findComponentsDownward(this, "iCheckbox");
      if (this.childrens) {
        const { value } = this;
        this.childrens.forEach((child) => {
          child.model = value;

          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0;
            child.group = true;
          }
        });
      }
    },
    change(data) {
      this.currentValue = data;
      this.$emit("input", data);
      this.$emit("on-change", data);
      this.dispatch("iFormItem", "on-form-change", data);
    },
  },
  mounted() {
    this.updateModel(true);
  },
  watch: {
    value() {
      this.updateModel(true);
    },
  },
};
</script>

<style></style>
