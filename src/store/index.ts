import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import { createStore, useStore as baseUseStore } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import { type UserInfo } from '@/api/types/login'
import { USER_INFO } from '@/utils/constants'

const state = {
  isCollapse: false,
  userInfo: getItem<UserInfo>(USER_INFO)
}

export type State = typeof state

export const key: InjectionKey<Store<State>> = Symbol('store')

// 创建一个新的 store 实例
export const store = createStore<State>({
  state,
  mutations: {
    changeIsCollapse (state, payload) {
      state.isCollapse = payload
    },
    setUserInfo (state, payload) {
      state.userInfo = payload

      setItem(USER_INFO, JSON.stringify(state.userInfo))
    }
  },
  actions: {
    triggerChangeIsCollapse ({ commit }, payload) {
      commit('changeIsCollapse', payload)
    },
    triggerSetUserInfo ({ commit }, payload) {
      commit('setUserInfo', payload)
    }
  }
})

export const useStore = (): Store<State> => {
  return baseUseStore(key)
}
