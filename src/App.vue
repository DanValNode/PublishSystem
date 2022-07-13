<template>
  <HeaderMenu />
  <Main msg="Welcome to Merqueo App"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Main from './infrastructure/components/Main.vue'
import HeaderMenu from '@/infrastructure/components/HeaderMenu.vue'

export default defineComponent({
  name: 'App',
  components: {
    Main,
    HeaderMenu
  },
  methods: {

  },
  data () {
    return {

    }
  }
})
</script>

<style lang="scss">
@import "variables";
* {
  margin: 0;
  box-sizing: border-box;
  font-family: $font-general;
}

body {
  background-color: $color-background;
}

/*----- animations ----*/
.fadein, .fadeout {
  opacity: 0;
  -moz-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out;
  -webkit-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;
  width: 100%;
}
.fadein {
  opacity: 1;
}

</style>
