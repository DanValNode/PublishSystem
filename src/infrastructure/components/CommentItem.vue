<template>
<div class="comment">
  <div class="comment__top">
    <img
      class="user__avatar"
      src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
      alt="user_avatar"
    />
    <div class="comment__topInfo">
      <h3>{{ comment.author }}</h3>
    </div>
  </div>
  <div class="comment__bottom">
    <p class="comment_text">
      {{ comment.body }}
    </p>
    <p class="small_text">{{ commentTime }}</p>
  </div>
</div>
</template>

<script>
import { dateHandler } from '@/infrastructure/utils/dateHandler'

export default {
  name: 'CommentItem',
  props: {
    comment: { type: Object }
  },
  data () {
    return {
      commentTime: 0
    }
  },
  mounted () {
    this.commentTime = dateHandler.getTextTime(dateHandler.getPostTime(this.comment.date))
  }
}
</script>

<style lang="scss" scoped>
@import "../../mixins";
@import "../../variables";

.comment {
  @extend %card_bottom;
}

.user__avatar {
  @include avatar(35px);
  margin-right: 12px;
}

.comment__top {
  @extend %content_userInfo;
  margin-top: 40px;
}

.comment__topInfo h3 {
  @extend %text-sub-info;
}

.comment__bottom {
  padding: 15px 65px;
  margin-top: -32px;
  & .comment_text {
    color: darken($color-text-gray, 5%);
    font-size: $size-text-content;
  }
  & .small_text {
    color: $color-text-gray;
    font-size: $size-text-small;
    margin-bottom: 30px;
  }
}

</style>
