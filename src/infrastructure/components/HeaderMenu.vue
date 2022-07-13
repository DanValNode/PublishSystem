<template>
  <div class="header">

    <div class="header__middle">
      <span>Publish Test</span>
    </div>

    <div class="header__right">
      <span class="material-icons">
        menu
      </span>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderMenu'
})
</script>

<style lang="scss" scoped>
@import "src/variables";

.header {
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  background-color: $color-secondary;
  z-index: 100;
  top: 0;
  box-shadow: 0 5px 8px -9px rgba(0, 0, 0, 0.75);
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
}

.header__left {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.header__middle {
  display: flex;
  flex: 1;
  justify-content: center;
  & span {
    font-weight: bold;
    font-size: $size-title;
    font-family: $font-general;
  }
}

.header__right {
  display: flex;
  align-items: center;
}

.header__right .material-icons {
  color: $color-text-black;
  margin: 0 10px;
}

.header__right .material-icons:hover {
  cursor: pointer;
}

</style>
