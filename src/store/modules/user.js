import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken,
  getUserName, setUserName, removeUserName,
  getUserAvatar, setUserAvatar, removeUserAvatar
} from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: getUserName(),
    avatar: getUserAvatar()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, type } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, type: type }).then(response => {
        const { Authorization, name } = response?.data
        commit('SET_TOKEN', Authorization)
        setToken(Authorization)
        setUserName(name || '')
        setUserAvatar('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, dispatch, state }, data) {
    return new Promise((resolve, reject) => {
      commit('SET_NAME', getUserName())
      commit('SET_AVATAR', getUserAvatar())
      // data && data.routes && dispatch('resetRoutes', data) // 根据权限隐藏无权限路由
      resolve({
        "roles":["admin"],
        "introduction":"I am a super administrator",
        "avatar":getUserAvatar(),
        "name":getUserName()
      })
    })
  },
  resetRoutes({}, data) {
    // 根据权限表隐藏无权限路由
    const { routes } = data // 路由
    // ...
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        removeUserName()
        removeUserAvatar()
        resetRouter()
        commit('RESET_STATE')

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        // dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeUserName()
      removeUserAvatar()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

