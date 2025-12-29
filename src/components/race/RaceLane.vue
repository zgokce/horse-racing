<template>
  <div class="race-lane" data-test="race-lane">
    <div class="position">
      <span>{{ lane }}</span>
    </div>

    <div class="lane">
      <HorseRunner :horse="horse" :distance="distance" :finishPercent="finishPercent" />
    </div>
  </div>
</template>

<script>
import HorseRunner from './HorseRunner.vue'

export default {
  name: 'RaceLane',
  components: { HorseRunner },
  props: {
    lane: Number,
    horse: Object,
    distance: Number,
    finishPercent: Number,
  },
}
</script>

<style scoped>
.race-lane {
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 4px;
  width: 100%;
}

.position {
  font-weight: bold;
  background-color: var(--color-dark-green);
  width: 24px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.position span {
  transform: rotate(-90deg);
}

.lane {
  flex: 1;
  height: 100%;
  background-color: #f3f4f6;
  position: relative;
  overflow: hidden;
}
</style>
