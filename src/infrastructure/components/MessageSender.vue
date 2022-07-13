<template>
  <div class="messageSender">
    <div class="messageSender__top">
      <form>
        <input v-on:focus="handleFocusInput(true)"
               v-on:blur="handleFocusInput(false)"
               v-model="text"
               class="messageSender__input"
               maxlength="255"
               placeholder="Escribe aquí tu estado" type="text" />
      </form>
    </div>

    <publish-button :handleButton="addPost" v-show="showInput" />
  </div>
</template>

<script>
import PublishButton from '@/infrastructure/components/PublishButton'
import { generateUid } from '@/infrastructure/utils/uid'
import { postService } from '@/domain/services/Post.service'
export default {
  name: 'MessageSender',
  components: { PublishButton },
  props: {
    handle: { type: Function }
  },
  data () {
    return {
      showInput: false,
      text: ''
    }
  },
  methods: {
    handleFocusInput (value) {
      setTimeout(() => {
        this.showInput = value
      }, 800)
    },
    addPost () {
      const infoPost = {
        id: generateUid(),
        text: this.text,
        author: localStorage.getItem('currentName'),
        authorId: localStorage.getItem('currentUser'),
        date: new Date().getTime()
      }
      postService.newPost(infoPost).then(_ => { this.handle() })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/variables";
@import "../../mixins";

.messageSender {
  display: flex;
  margin-top: 2px;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  box-shadow: $shadow-setting-card;
  width: 100%;
}

.messageSender__top {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eff2f5;
  padding: 15px;
}

.messageSender__top form {
  flex: 1;
  display: flex;
  & input {
    @extend %published_input;
  }
}

.messageSender__option:hover {
  cursor: pointer;
}

.messageSender__input:focus {
  border-color: $color-primary;
}

.messageSender__top form .messageSender__input:focus ~ .messageSender__bottom {
  display: none;
}

</style>
