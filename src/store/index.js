import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarioActivo: null,
    usuarios: [
      { nombre: 'admin', password: '1234' },
      { nombre: 'jose', password: '18378400' },
    ]
  },
  getters: {
    getUsuarioActivo(state) {
      return state.usuarioActivo
    }
  },
  mutations: {
    modificarUsuarioActivo(state, nuevousuario) {
      state.usuarioActivo = nuevousuario
    },
    logout(state) {
      state.usuarioActivo = null
    },
    cargarUsuarios(state, usuariosApi) {
      state.usuarios = usuariosApi
    }
  },
  actions: {
    obtenerUsuariosApi: async function ({ commit }) {
      const data = await fetch("https://my.api.mockaroo.com/users.json?key=140b4040");
      const usuarios = await data.json();
      const usuMapeados = usuarios.map((usu) => {
        return {
          nombre: usu.nombre,
          password: usu.password
        }
      });
      commit('cargarUsuarios', usuMapeados)
    }
  },
  modules: {
  }
})
