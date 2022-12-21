<template>
  <div class="container">
    <form
      v-if="!$store.getters.getUsuarioActivo"
      @submit.prevent="chequearUsuario"
    >
      <div class="form-group">
        <label for="user"> Usuario: </label>
        <input
          type="text"
          name="user"
          v-model="user"
          placeholder="Ingrese el usuario"
        />
      </div>
      <div class="form-group">
        <label for="password"> Contraseña: </label>
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="Ingrese Contraseña"
        />
      </div>
      <button class="btn btn-primary my-3">Log-in</button>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "BaseHome",
  data() {
    return {
      user: "",
      password: "",
    };
  },
  /*created: function () {
    this.obtenerUsuariosApi();
  },*/
  methods: {
    ...mapMutations(["modificarUsuarioActivo"]),
    ...mapActions(["obtenerUsuariosApi"]),
    logout() {
      this.logout();
      this.$router.push("/");
    },
    chequearUsuario() {      
      let encontrado = this.$store.state.usuarios.find(
        (usuario) =>
          usuario.nombre == this.user && usuario.password === this.password
      );
      console.log(encontrado);
      if (encontrado) {
        this.modificarUsuarioActivo(encontrado.nombre);
        Object.assign(this.$data, this.$options.data);
      }
    },
  },
};
</script>

<style>
</style>