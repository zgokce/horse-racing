<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import Header from './components/layout/Header.vue'
import HorseTable from './components/HorseTable.vue'
import RaceTrack from './components/race/RaceTrack.vue'
import ProgramTable from './components/ProgramTable.vue'
import ResultsTable from './components/ResultsTable.vue'
import { appendText } from './utils/index.js'

const store = useStore()

onMounted(async () => {
  await store.dispatch('horses/generateHorses')
})

const currentRound = computed(() => {
  const program = store.state.program.program
  const index = store.state.race.currentRoundIndex

  if (!program.length) return null
  if (index >= program.length) return null

  return program[index]
})

const raceHorseIds = computed(() => {
  return currentRound.value?.horses || []
})

const raceHorses = computed(() => {
  return raceHorseIds.value.map((id) => store.getters['horses/getHorseById'](id))
})

const displayHorses = computed(() => {
  const program = store.state.program.program
  const race = store.state.race

  if (race.isFinished && race.results.length) {
    return race.results[race.results.length - 1].ranking
  }

  if (program.length && currentRound.value) {
    return raceHorses.value
  }

  return store.getters['horses/allHorses'].slice(0, 10)
})

const displayDistance = computed(() => {
  if (store.state.race.isFinished && store.state.race.results.length) {
    return store.state.race.results.at(-1).distance
  }

  return currentRound.value?.distance?.value || 1200
})

const currentRoundInfo = computed(() => {
  const race = store.state.race
  const program = store.state.program.program

  if (!program.length) return null

  const index = race.isFinished ? program.length - 1 : race.currentRoundIndex

  const round = program[index]
  if (!round) return null

  return {
    current: index + 1,
    total: program.length,
    distance: round.distance,
  }
})
</script>
<template>
  <Header />

  <div class="container">
    <HorseTable />
    <div>
      <RaceTrack v-if="displayHorses.length" :horses="displayHorses" :distance="displayDistance" />
      <div class="race-track-footer">
        <div v-if="currentRoundInfo" class="round-info">
          {{ appendText(currentRoundInfo.current) }} Lap - {{ currentRoundInfo.distance }}m
        </div>
        <div class="finish-line">FINISH</div>
      </div>
    </div>
    <ProgramTable />
    <ResultsTable />
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  gap: 6px;
  padding: 16px;
  max-height: 90vh;
}
.race-track-footer {
  display: flex;
  justify-content: end;
  font-size: var(--text-md);
  font-weight: 700;
}
.round-info {
  text-align: center;
  flex: 1;
}

@media (max-width: 576px) {
  .container {
    grid-template-columns: 1fr;
    gap: 12px;
    max-height: none;
  }
}
</style>
