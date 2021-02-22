<template>
  <div class="alert">
    <div class="alert-item" v-for="(item, index) in notices" :key="index">
      {{ item.content }}
    </div>
  </div>
</template>

<script>
import { randomStr } from "../../utils/index";
let NoticeID = 0;
export default {
  data() {
    return {
      notices: [],
    };
  },
  methods: {
    add(notice) {
      let name = randomStr() + NoticeID++;
      let newNotice = Object.assign(
        {
          name,
        },
        notice
      );
      this.notices.push(newNotice);
      setTimeout(() => {
        this.remove(name);
      }, notice.duration * 1000);
    },
    remove(name) {
      for (let i = 0; i < this.notices.length; i++) {
        let item = this.notices[i];
        if (item.name === name) {
          this.notices.splice(i, 1);
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
.alert {
  max-width: 800px;
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
.alert-item {
  margin: auto;
  width: 200px;
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 5px 5px 5px black;
  text-align: center;
}
</style>
