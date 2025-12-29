import { createStore } from 'vuex'
import horses from './modules/horses'
import race from './modules/race.js'
import program from './modules/program.js'

export default createStore({
  modules: {
    horses,
    race,
    program,
  },
})
