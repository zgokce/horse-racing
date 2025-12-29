import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ResultsTable from '@/components/ResultsTable.vue'
import { createStore } from 'vuex'

describe('ResultsTable.vue', () => {
  const store = createStore({
    modules: {
      race: {
        namespaced: true,
        state: {
          results: [
            {
              round: 1,
              distance: 1200,
              ranking: [
                { id: 1, name: 'Altın Sima' },
                { id: 2, name: 'Azmin Zaferi' },
                { id: 3, name: 'Head Vorker' },
              ],
            },
            {
              round: 2,
              distance: 1400,
              ranking: [
                { id: 2, name: 'Azmin Zaferi' },
                { id: 1, name: 'Altın Sima' },
                { id: 3, name: 'Head Vorker' },
              ],
            },
          ],
        },
        getters: {
          raceResults: (state) => state.results,
        },
      },
    },
  })

  it('renders correct number of rounds', () => {
    const wrapper = mount(ResultsTable, {
      global: {
        plugins: [store],
      },
    })

    const lapTitles = wrapper.findAll('.lap-title')
    expect(lapTitles.length).toBe(2)
    expect(lapTitles[0].text()).toContain('1st Lap – 1200m')
    expect(lapTitles[1].text()).toContain('2nd Lap – 1400m')
  })

  it('renders correct number of rows per round', () => {
    const wrapper = mount(ResultsTable, {
      global: {
        plugins: [store],
      },
    })

    const lap1Rows = wrapper.findAll('.lap-section')[0].findAll('tbody tr')
    expect(lap1Rows.length).toBe(3)
    expect(lap1Rows[0].text()).toContain('Altın Sima')

    const lap2Rows = wrapper.findAll('.lap-section')[1].findAll('tbody tr')
    expect(lap2Rows[0].text()).toContain('Azmin Zaferi')
  })

  it('adds trophy emoji for 1st place', () => {
    const wrapper = mount(ResultsTable, {
      global: {
        plugins: [store],
      },
    })

    const firstRowLap1 = wrapper.findAll('.lap-section')[0].findAll('tbody tr')[0]
    expect(firstRowLap1.text()).toContain('🏆')

    const firstRowLap2 = wrapper.findAll('.lap-section')[1].findAll('tbody tr')[0]
    expect(firstRowLap2.text()).toContain('🏆')
  })
})
