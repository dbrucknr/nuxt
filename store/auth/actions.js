import axios from "axios"
const actions = {
  login: async ({ commit, state }, credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      commit('setToken', response.data)
    } catch (error) {
      console.error(error); 
    }
  },
  register: async ({ commit, state }) => {

  }, 
}

export default actions