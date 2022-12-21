<template>
  <div class="home">
   <base-home />
  </div>
</template>

<script>
// @ is an alias to /src
import BaseHome from '@/components/BaseHome.vue'

export default {
  name: 'HomeView',
  components: {    
    BaseHome
  }
}
</script>
