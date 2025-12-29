<template>
  <div class="results-table" data-test="results-table">
    <h3 class="results-table-title">Results</h3>
    <div
      v-if="store.state.race.results.length"
      v-for="lap in results"
      :key="lap.round"
      class="lap-section"
    >
      <h3 class="lap-title">{{ appendText(lap.round) }} Lap – {{ lap.distance }}m</h3>
      <BaseTable :columns="columns" :data="rows(lap)" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import BaseTable from '@/components/common/BaseTable.vue'
import { appendText } from '../utils/index.js'

const store = useStore()

const results = computed(() => store.state.race.results)

const columns = [
  { key: 'position', label: 'Position' },
  { key: 'name', label: 'Horse Name' },
]

const rows = (lap) => {
  return lap.ranking.map((horse, index) => ({
    position: index + 1,
    isWinner: index === 0,
    name: horse.name,
  }))
}
</script>

<style scoped>
.results-table-title {
  background-color: var(--color-green);
  margin: 0;
  font-weight: 600;
  font-size: var(--text-xl);
  text-align: center;
}

.results-table {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 90vh;
}

.lap-title {
  margin: 0;
  font-weight: 600;
  background-color: var(--color-red);
  font-size: var(--text-md);
  text-align: center;
}
</style>
