<template>
  <div class="feed">
    <message-sender :handle="handleAdd" />
    <template v-for="item in posts" :key="item.id">
      <card-post v-bind:identifier="item.id" v-bind:data="item" />
    </template>
  </div>
</template>

<script>
import MessageSender from '@/infrastructure/components/MessageSender'
import CardPost from '@/infrastructure/components/CardPost'
import { postService } from '@/domain/services/Post.service'

export default {
  name: 'FeedPost',
  components: { MessageSender, CardPost },

  data () {
    return {
      posts: [],
      added: false
    }
  },

  watch: {
    added (newVal, oldVal) {
      console.log(newVal, oldVal)
      if (this.added) {
        this.getPostUser()
        this.added = false
      }
    }
  },

  created () {
    this.getPostUser()
  },

  methods: {
    getPostUser () {
      postService.getPosts().then(resp => {
        this.posts = resp.reverse()
      })
    },
    handleAdd () {
      this.added = true
    }
  }
}
</script>

<style lang="scss" scoped>

.feed {
  flex: 1;
  padding: 30px 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hide {
  display: none;
}

@media (max-width: 768px) {
  .feed {
    margin: 20px 5%;
    width: 90%;
    padding: 0;
  }
}

</style>
