<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "iForm",
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
  },
  created() {
    this.$on("on-form-item-add", (field) => {
      console.log("添加form");
      if (field) this.fields.push(field);
    });
    this.$on("on-form-item-remove", (field) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
    });
  },
  data() {
    return {
      //缓存所有的fields
      fields: [],
    };
  },
  methods: {
    resetFields() {
      this.fields.forEach((field) => {
        field.resetFields();
      });
    },
    validate(callback) {
      return new Promise((resolve) => {
        let valid = true;
        let count = 0;
        this.fields.forEach((field) => {
          field.validate("", (errors) => {
            if (errors) {
              valid = false;
            }
            if (++count === this.fields.length) {
              resolve(valid);
              if (typeof callback === "function") {
                callback(valid);
              }
            }
          });
        });
      });
    },
  },
};
</script>

<style></style>
