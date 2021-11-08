<template>
  <div class="filters">
    <div class="title" v-text="filterTitle"></div>
    <div v-for="(item, index) in filterData" :key="index">
      <div class="filters-item" @click="changeOnClick(item)">
        <Checkbox :id="item.label" :check="item.checked" />
        <div class="title_checkbox" v-text="item.label"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from "./ui-kit/checkbox/Checkbox";
export default {
  name: "Filters",
  components: {
    Checkbox,
  },
  props: {
    filterTitle: {
      type: String,
      required: true,
    },
    filterData: {
      type: [Array, Object],
      default: () => [],
    },
  },
  methods: {
    changeOnClick(event) {
      this.$emit("filter", event);
    },
  },
};
</script>

<style scoped lang="scss">
.filters {
  display: flex;
  flex-direction: column;
  max-width: 240px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
  @media screen and (max-width: 1165px) {
    max-width: 200px;
  }
  & .title {
    text-align: left;
    color: #202123;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 12px;
  }
  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    cursor: pointer;

    & .title_checkbox {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      color: #202123;
      margin-left: 12px;
    }
  }
}
</style>
