<template>
  <div class="race-track" data-test="race-track">
    <RaceLane
      v-for="(horse, index) in horses"
      :key="horse.id"
      :horse="horse"
      :lane="index + 1"
      :distance="distance"
      :finishPercent="95"
    />

    <div class="finish-line" />
  </div>
</template>

<script>
import RaceLane from './RaceLane.vue'

export default {
  name: 'RaceTrack',
  components: { RaceLane },
  props: {
    horses: {
      type: Array,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped>
.race-track {
  position: relative;
  border: 2px solid #d1d5db;
}

.finish-line {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 10px;
  background-color: var(--color-red);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
