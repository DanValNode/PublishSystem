<template>
  <div class="main__body">
    <feed-post v-if="inSession" />
    <user-modal v-if="!inSession" :handle="getSession" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FeedPost from '@/infrastructure/components/FeedPost.vue'
import UserModal from '@/infrastructure/components/UserModal.vue'

export default defineComponent({
  name: 'Main',
  components: { UserModal, FeedPost },
  props: {
    msg: String
  },
  data () {
    return {
      inSession: false
    }
  },
  created () {
    this.getSession()
  },
  methods: {
    getSession () {
      this.inSession = localStorage.getItem('currentUser') !== null
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
