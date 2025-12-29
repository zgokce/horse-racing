import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HorseTable from '@/components/HorseTable.vue'
import { createStore } from 'vuex'

describe('HorseTable.vue', () => {
  const store = createStore({
    modules: {
      horses: {
        namespaced: true,
        state: {
          allHorses: [
            { id: 1, name: 'Altın Sima', condition: 90, color: '#e6194b' },
            { id: 2, name: 'Azmin Zaferi', condition: 85, color: '#3cb44b' },
          ],
        },
        getters: {
          allHorses: (state) => state.allHorses,
        },
      },
    },
  })

  it('renders the correct number of horses', () => {
    const wrapper = mount(HorseTable, {
      global: {
        plugins: [store],
      },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(2)
  })

  it('renders horse name and condition', () => {
    const wrapper = mount(HorseTable, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.text()).toContain('Altın Sima')
    expect(wrapper.text()).toContain('90')
  })
})
