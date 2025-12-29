<template>
  <div data-test="horse-table">
    <h3 class="horse-table-title">Horse List (1-20)</h3>
    <BaseTable :columns="columns" :data="horses">
      <template #cell-color="{ row }">
        <span class="color-dot" :style="{ backgroundColor: row.color }" />
      </template>
    </BaseTable>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import BaseTable from './common/BaseTable.vue'

const store = useStore()
const horses = computed(() => store.getters['horses/allHorses'])

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'condition', label: 'Condition' },
  { key: 'color', label: 'Color' },
]
</script>

<style scoped>
.horse-table-title {
  background-color: var(--color-yellow);
  margin: 0;
  font-weight: 600;
  font-size: var(--text-xl);
  text-align: center;
}
.color-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
}
</style>
