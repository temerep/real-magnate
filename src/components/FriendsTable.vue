<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  search: String
})

const { t } = useI18n()
const currFilter = ref(null)
const currFilterSide = ref(null)
const filters = ["username", "offices", "ton", "rent", "lost"]

</script>

<template>
  <div class="friends-table">
    <div class="sort-pannel">
      <div class="sort-item" :class="{ active: currFilter == filter }" v-for="filter in filters" :key="filter"
        @click="currFilter = filter">
        <label>{{ t(`modals.friends.filters.${filter}`) }}</label>
        <div class="sides">
          <img class="up-arr" :class="{ active: currFilter == filter && currFilterSide === 'up' }"
            src="@/assets/common/up-arr.svg" />
          <img class="down-arr" :class="{ active: currFilter == filter && currFilterSide === 'down' }"
            src="@/assets/common/down-arr.svg" />
        </div>
      </div>
    </div>
    <div class="main-table">
      <div class="table-row">
        <div class="col">Anrew123</div>
        <div class="col">6/250 m2</div>
        <div class="col">12</div>
        <div class="col">5465</div>
        <div class="col">96 days</div>
      </div>
      <div class="table-row" :class="{ highlighted: true }">
        <div class="col">Anrew123</div>
        <div class="col">6/250 m2</div>
        <div class="col">12</div>
        <div class="col">5465</div>
        <div class="col">96 days</div>
      </div>
      <div class="table-row">
        <div class="col">Anrew123</div>
        <div class="col">6/250 m2</div>
        <div class="col">12</div>
        <div class="col">5465</div>
        <div class="col">96 days</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.friends-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .sort-pannel {
    width: 100%;
    background: #7AABD040;
    border-radius: 10px;
    padding: 5px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .sort-item {
      flex: 1;
      display: flex;
      border-radius: 10px;
      padding: 5px 5px;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &.active {
        background: #ffffff1a;
      }

      label {
        color: #fff;
        font-family: Inter, sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -0.4px;
        text-align: center;
      }

      .sides {

        .up-arr,
        .down-arr {
          opacity: 0.5;

          &.active {
            opacity: 1;
          }
        }
      }
    }
  }

  .main-table {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .table-row {
      display: flex;
      width: 100%;
      height: 30px;
      border-radius: 10px;
      justify-content: space-between;
      align-items: center;

      &.highlighted {
        background: #FFFFFF1A;
      }

      .col {
        flex: 1;
        font-family: Inter, sans-serif;
        color: #fff;
        font-size: 13px;
        font-weight: 500;
        text-align: center;
      }
    }
  }
}
</style>