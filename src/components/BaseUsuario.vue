<template>
  <div>
    <p>Bienvenido/a {{!$store.getters.getUsuarioActivo}}</p>
    <button @click="desloguear" class="btn btn-danger">Logout</button>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    name:'BaseUsuario',    
    methods:{
        ...mapMutations(['logout']),
         desloguear(){
            this.logout();
            this.$router.push('/');
        }
    }
}
</script>

<style>

</style>