import { HORSE_COLORS, HORSE_NAMES, TOTAL_HORSES } from '@/constants/horses.js'
import { getRandomCondition } from '@/utils/index.js'

export default {
  namespaced: true,

  state: () => ({
    horses: [],
  }),

  getters: {
    allHorses: (state) => state.horses,
    getHorseById: (state) => (id) => state.horses.find((horse) => horse.id === id),
  },

  mutations: {
    SET_HORSES(state, horses) {
      state.horses = horses
    },
  },

  actions: {
    generateHorses({ commit }) {
      const horses = Array.from({ length: TOTAL_HORSES }, (_, index) => ({
        id: index + 1,
        name: HORSE_NAMES[index],
        color: HORSE_COLORS[index],
        condition: getRandomCondition(),
      }))

      commit('SET_HORSES', horses)
    },
  },
}
