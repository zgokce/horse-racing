import { ROUNDS } from '@/constants/race.js'

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5)

export default {
  namespaced: true,

  state: () => ({
    program: [],
  }),

  getters: {
    raceProgram: (state) => state.program,
  },

  mutations: {
    SET_PROGRAM(state, program) {
      state.program = program
    },
    RESET_PROGRAM(state) {
      state.program = []
    },
  },

  actions: {
    generateProgram({ commit, rootGetters }) {
      const horses = rootGetters['horses/allHorses']

      const program = ROUNDS.map((round) => {
        const selectedHorses = shuffle(horses)
          .slice(0, 10)
          .map((horse) => horse.id)

        return {
          round: round.round,
          distance: round.distance,
          horses: selectedHorses,
        }
      })

      commit('SET_PROGRAM', program)
    },
  },
}
