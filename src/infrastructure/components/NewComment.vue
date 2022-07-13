<template>
<div class="post_comment">
  <div class="post_comment_content">
    <form>
      <input v-model="text"
             class="post_comment_input" type="text"
             maxlength="255"
             placeholder="Escribe un comentario">
    </form>
  </div>
  <PublishButton :handleButton="addComment" />
</div>
</template>

<script>
import PublishButton from '@/infrastructure/components/PublishButton'
import { commentService } from '@/domain/services/Comment.service'
import { generateUid } from '@/infrastructure/utils/uid'

export default {
  name: 'NewComment',
  components: { PublishButton },
  props: {
    post: { type: String },
    update: { type: Function }
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
    addComment () {
      const comment = {
        id: generateUid(),
        body: this.text,
        postId: this.post,
        author: localStorage.getItem('currentName'),
        authorId: localStorage.getItem('currentUser'),
        date: new Date().getTime()
      }
      commentService.newComment(comment).then(_ => { this.update(true) })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../variables";
@import "../../mixins";

.post_comment {
  @extend %card_bottom;
}

.post_comment_content {
  display: flex;
  align-items: center;
  padding: 15px;
  & form {
    flex: 1;
    display: flex;
    & input {
      @extend %published_input;
      max-height: 40px;
      margin-top: 20px;
    }
  }
}

</style>
