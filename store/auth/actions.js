import axios from "axios"
const actions = {
  login: async ({ commit, state }, credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      if (response.status != 200) {
        console.error('An Error has occurred');
        return
      }
      const { token, user } = response.data;
      commit('setToken', token);
      commit('setUser', user);
    } catch (error) {
      console.error(error); 
    }
  },
  register: async ({ commit, state }) => {

  }, 
}

export default actions