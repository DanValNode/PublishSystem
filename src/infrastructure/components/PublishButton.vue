<template>
  <div class="messageSender__bottom">
    <div class="messageSender__option">
      <h3 v-on:click="handleButton">Publicar</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublishButton',
  props: {
    handleButton: { type: Function }
  }
}
</script>

<style lang="scss" scoped>
@import "../../variables";
@import "../../mixins";

.messageSender__bottom {
  display: flex;
  justify-content: space-evenly;
  margin: 8px 10px;
}

.messageSender__option {
  padding: 8px;
  display: flex;
  align-items: center;
  color: $color-secondary;
  margin: 5px;
  background-color: $color-primary;
  border-radius: 10px;
  & h3 {
    @extend %publish_button;
  }
}
</style>
