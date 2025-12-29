export default {
  namespaced: true,

  state: () => ({
    currentRoundIndex: 0,
    isRacing: false,
    isFinished: false,
    progress: {},
    results: [],
  }),

  getters: {
    currentRound(state, getters, rootState) {
      return rootState.program.program[state.currentRoundIndex] || null
    },
    horseProgress: (state) => (horseId) => state.progress[horseId] || 0,
  },

  mutations: {
    SET_RACING(state, value) {
      state.isRacing = value
    },

    SET_PROGRESS(state, { horseId, value }) {
      state.progress = {
        ...state.progress,
        [horseId]: value,
      }
    },

    ADD_RESULT(state, result) {
      state.results.push(result)
    },

    NEXT_ROUND(state) {
      state.currentRoundIndex++
      state.progress = {}
    },

    SET_FINISHED(state, value) {
      state.isFinished = value
    },

    RESET_RACE(state) {
      state.currentRoundIndex = 0
      state.isRacing = false
      state.isFinished = false
      state.progress = {}
      state.results = []
    },
  },

  actions: {
    async startRace({ state, commit, getters, rootGetters }) {
      if (state.isRacing) return

      commit('SET_RACING', true)

      while (state.currentRoundIndex < 6) {
        const round = getters.currentRound
        if (!round) break

        const horses = round.horses.map((id) => rootGetters['horses/getHorseById'](id))

        const speeds = {}
        horses.forEach((horse) => {
          speeds[horse.id] = horse.condition
          commit('SET_PROGRESS', { horseId: horse.id, value: 0 })
        })

        const finishOrder = []
        const finished = new Set()

        await new Promise((resolve) => {
          const interval = setInterval(() => {
            horses.forEach((horse) => {
              if (finished.has(horse.id)) return

              const current = state.progress[horse.id] || 0
              const next = Math.min(current + speeds[horse.id] * 0.02, 100)

              commit('SET_PROGRESS', {
                horseId: horse.id,
                value: next,
              })

              if (next >= 100) {
                finished.add(horse.id)
                finishOrder.push(horse.id)
              }
            })

            if (finished.size === horses.length) {
              clearInterval(interval)
              resolve()
            }
          }, 50)
        })

        const ranking = finishOrder.map((id) => horses.find((h) => h.id === id))

        commit('ADD_RESULT', {
          round: round.round,
          distance: round.distance,
          ranking,
          winner: ranking[0],
        })

        commit('NEXT_ROUND')

        await new Promise((r) => setTimeout(r, 500))
      }

      commit('SET_RACING', false)
      commit('SET_FINISHED', true)
    },
  },
}
