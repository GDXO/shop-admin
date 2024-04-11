import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import { createStore, useStore as baseUseStore } from 'vuex'

const state = {
  isCollapse: false
}

export type State = typeof state

export const key: InjectionKey<Store<State>> = Symbol('store')

// 创建一个新的 store 实例
export const store = createStore<State>({
  state,
  mutations: {
    changeIsCollapse (state, payload) {
      state.isCollapse = payload
    }
  },
  actions: {
    triggerChangeIsCollapse ({ commit }, payload) {
      commit('changeIsCollapse', payload)
    }
  }
})

export const useStore = (): Store<State> => {
  return baseUseStore(key)
}
