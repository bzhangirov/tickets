<template>
  <div>
    <input :id="id" type="checkbox" hidden :checked="check" />
    <label :for="id" />
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    id: {
      type: [String, Number],
      default() {
        return Math.floor(Math.random() * Math.floor(999));
      },
    },
    check: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>

<style scoped lang="scss">
input[type="checkbox"]:checked ~ label {
  border-color: #46ac4a;
  background: #46ac4a url("./check.png") 100% 100% no-repeat;
  background-position: center center;
}

input[type="checkbox"] ~ label {
  display: block;
  width: 18px;
  height: 18px;
  background: transparent;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 3px;
  cursor: pointer;
}
</style>
