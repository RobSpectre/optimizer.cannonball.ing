import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia, defineStore } from 'pinia'
import { nextTick } from 'vue'
import OptimalSpeedCard from '@/components/OptimalSpeedCard.vue'

// Mock external dependencies
vi.mock('@/lib/utils', () => ({
  findOptimalSpeed: vi.fn((distance, capacity, stopTime, observations) => ({
    best_speed: 65,
    min_time: 180,
    economy: 25,
    stops: 2,
    refueling_time: 30,
    fuel_consumed: 45.5
  })),
  convertMinutesToHoursMinutes: vi.fn().mockReturnValue('3 hours')
}))

vi.mock('vue-gtag', () => ({
  event: vi.fn()
}))

// Create a mock store
const useTestStore = defineStore('test', {
  state: () => ({
    distance: 300,
    capacity: 15,
    stop_time: 15,
    model: 'Test Car',
    observations: [
      { speed: 60, economy: 30 },
      { speed: 70, economy: 25 }
    ],
    observationsSpeedByTravelTime: [
      { Speed: 60, Hours: 5 },
      { Speed: 70, Hours: 4.5 }
    ]
  }),
  actions: {
    setDistance(distance) {
      this.distance = distance
    },
    setCapacity(capacity) {
      this.capacity = capacity
    },
    setObservations(observations) {
      this.observations = observations
    }
  }
})

describe('OptimalSpeedCard', () => {
  let wrapper
  let store

  beforeEach(() => {
    // Create a fresh Pinia instance
    setActivePinia(createPinia())
    
    // Create a fresh store instance
    store = useTestStore()

    // Mount component
    wrapper = mount(OptimalSpeedCard, {
      global: {
        plugins: [createPinia()]
      }
    })
  })

  it('should not render when there are insufficient observations', async () => {
    store.setObservations([])
    await nextTick()
    expect(wrapper.find('.card').exists()).toBe(false)
  })

  it('should render when there are sufficient observations', async () => {
    await nextTick()
    expect(wrapper.find('.card').exists()).toBe(true)
  })

  it('should calculate optimal values when observations change', async () => {
    await nextTick()
    const title = wrapper.find('.text-2xl')
    expect(title.text()).toContain('65')  // best_speed from mocked findOptimalSpeed
  })

  it('should display the LineChart when there are 3 or more observations', async () => {
    store.setObservations([
      { speed: 60, economy: 30 },
      { speed: 70, economy: 25 },
      { speed: 80, economy: 20 }
    ])
    await nextTick()
    expect(wrapper.findComponent({ name: 'LineChart' }).exists()).toBe(true)
  })

  it('should not display the LineChart with fewer than 3 observations', async () => {
    await nextTick()
    expect(wrapper.findComponent({ name: 'LineChart' }).exists()).toBe(false)
  })

  it('should format y-axis values correctly', () => {
    const component = wrapper.vm
    expect(component.yFormatter(1000)).toBe('1,000')
    expect(component.yFormatter('not a number')).toBe('')
  })

  it('should track optimal speed calculation with GA', async () => {
    await nextTick()
    expect(vi.mocked(event)).toHaveBeenCalledWith(
      'Find Optimal Speed',
      expect.objectContaining({
        event_category: 'UX',
        observation_speed: 65,
        vehicle_model: 'Test Car',
        vehicle_fuel_capacity: 15,
        vehicle_target_distance: 300
      })
    )
  })

  it('should display all vehicle stats in the table', async () => {
    await nextTick()
    const tableCells = wrapper.findAll('td')
    expect(tableCells.some(cell => cell.text().includes('Test Car'))).toBe(true)
    expect(tableCells.some(cell => cell.text().includes('15'))).toBe(true)
    expect(tableCells.some(cell => cell.text().includes('300'))).toBe(true)
    expect(tableCells.some(cell => cell.text().includes('65'))).toBe(true)
  })

  it('should update when store values change', async () => {
    store.setDistance(400)
    store.setCapacity(20)
    await nextTick()
    const tableCells = wrapper.findAll('td')
    expect(tableCells.some(cell => cell.text().includes('400'))).toBe(true)
    expect(tableCells.some(cell => cell.text().includes('20'))).toBe(true)
  })

  it('should handle store state resets', async () => {
    store.$reset()
    await nextTick()
    expect(wrapper.find('.card').exists()).toBe(false)
  })

  it('should patch store state', async () => {
    store.$patch({
      distance: 500,
      capacity: 25,
      observations: [
        { speed: 60, economy: 30 },
        { speed: 70, economy: 25 },
        { speed: 80, economy: 20 }
      ]
    })
    await nextTick()
    const tableCells = wrapper.findAll('td')
    expect(tableCells.some(cell => cell.text().includes('500'))).toBe(true)
    expect(tableCells.some(cell => cell.text().includes('25'))).toBe(true)
    expect(wrapper.findComponent({ name: 'LineChart' }).exists()).toBe(true)
  })
})
