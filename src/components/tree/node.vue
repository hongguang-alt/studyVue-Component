<template>
  <ul class="tree-ul">
    <li class="tree-li">
      <span class="tree-expand" @click="handleExpand">
        <span v-if="data.children && data.children.length && !data.expand"
          >+</span
        >
        <span v-if="data.children && data.children.length && data.expand"
          >-</span
        >
      </span>
      <i-checkbox
        v-if="showCheckbox"
        :value="data.checked"
        @input="handleCheck"
      ></i-checkbox>
      <span>{{ data.title }}</span>
      <div v-if="data.expand">
        <tree-node
          v-for="(item, index) in data.children"
          :key="index"
          :data="item"
          :show-checkbox="showCheckbox"
        ></tree-node>
      </div>
    </li>
  </ul>
</template>

<script>
import iCheckbox from "../checkbox/checkbox.vue";
import { findComponentUpward } from "../../utils/index.js";
export default {
  name: "treeNode",
  components: { iCheckbox },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    console.log(11);
  },
  data() {
    return {
      tree: findComponentUpward(this, "Tree"),
    };
  },
  watch: {
    "data.children": {
      handler(data) {
        if (data) {
          const checkedAll = !data.some((item) => item.checked);
          this.$set(this.data, "checked", checkedAll);
        }
      },
      deep: true,
    },
  },
  methods: {
    handleExpand() {
      this.$set(this.data, "expand", !this.data.expand);
      if (this.tree) {
        this.tree.emitEvent("on-toggle-expand", this.data);
      }
    },
    handleCheck(checked) {
      this.updateTreeDown(this.data, checked);
      if (this.tree) {
        this.tree.emitEvent("on-check-change", this.data);
      }
    },
    updateTreeDown(data, checked) {
      this.$set(data, "checked", checked);
      if (data.children && data.children.length) {
        data.children.forEach((item) => {
          this.updateTreeDown(item, checked);
        });
      }
    },
  },
};
</script>

<style>
.tree-ul,
.tree-li {
  list-style: none;
  padding-left: 10px;
}
.tree-expand {
  cursor: pointer;
}
</style>
