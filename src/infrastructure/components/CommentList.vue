<template>
<div class="list_comments" v-for="item in comments" :key="item">
  <comment-item :comment="item" />
</div>
</template>

<script>
import CommentItem from '@/infrastructure/components/CommentItem'

export default {
  name: 'CommentList',
  components: { CommentItem },
  props: {
    post: { type: String },
    update: { type: Function },
    isUpdate: { type: Boolean },
    comments: { type: Array }
  }
}
</script>

<style lang="scss" scoped>
@import "../../variables";
@import "../../mixins";

.list_comments {
  @extend %card_bottom;
}

</style>
