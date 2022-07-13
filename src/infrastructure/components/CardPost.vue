<template>
  <div class="post">
    <div class="post__top">
      <img
        class="user__avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        alt="user_avatar"
      />
      <div class="post__topInfo">
        <h3>{{ data.author }}</h3>
        <p>{{ datePost ?? '' }}</p>
      </div>
    </div>

    <div class="post__bottom">
      <p>
        {{ data.text }}
      </p>
    </div>

    <div class="content__actions">
      <div class="avatar_list">
        <img v-show="likeCounter > 0" src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" class="avatar__reactions">
        <img v-show="likeCounter > 1" src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar" class="avatar__reactions">
        <img v-show="likeCounter > 2" src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" class="avatar__reactions">
        <span>{{ likeCounter > 0 ? (likeCounter + ' like' + (likeCounter > 1 ? 's' : '')) : 'No tiene likes' }}</span>
      </div>
      <div class="content__comment__action" v-on:click="changeSelected(actionSelected === 'list' ? '' : 'list')">
        <span>{{ commentCount + ' Comentarios' }}</span>
      </div>
    </div>

    <div class="post__options">
      <div class="post__option">
        <reactions v-show="userReact === null || userReact === undefined"
                   v-bind:identifier="identifier"
                   :handle="setUserReact"
        />
        <label v-if="userReact === null || userReact === undefined" :for="identifier" class="label-reactions">Reaccionar</label>
        <label v-if="userReact !== null && userReact !== undefined" class="label-reacted">
          {{ userReact.type }}
        </label>
      </div>

      <div class="post__option" v-on:click="changeSelected(actionSelected === 'new' ? '' : 'new')">
        <p>Comentar</p>
      </div>
    </div>
  </div>
  <div v-show="actionSelected === 'new'" :class="actionSelected === 'new' ? 'fadein' : 'fadeout'">
    <new-comment :update="updateData" :post="identifier" v-show="actionSelected === 'new'" />
  </div>
  <div v-show="actionSelected === 'list'" :class="actionSelected === 'list' ? 'fadein' : 'fadeout'">
    <comment-list :comments="allComments" :update="updateData" :isUpdate="newData" :post="identifier" v-show="actionSelected === 'list'" />
  </div>
</template>

<script>
import Reactions from '@/infrastructure/components/Reactions'
import NewComment from '@/infrastructure/components/NewComment'
import CommentList from '@/infrastructure/components/CommentList'
import { dateHandler } from '@/infrastructure/utils/dateHandler'
import { commentService } from '@/domain/services/Comment.service'
import { reactionService } from '@/domain/services/Reaction.service'
import { textTransform } from '@/infrastructure/utils/textTransform'

export default {
  name: 'CardPost',
  components: { CommentList, NewComment, Reactions },
  props: {
    identifier: { type: String },
    data: { type: Object }
  },
  data () {
    return {
      actionSelected: '',
      datePost: dateHandler.getTextTime(dateHandler.getPostTime(this.data?.date)),
      commentCount: 0,
      allComments: [],
      newData: false,
      reactionsPost: [],
      likeCounter: 0,
      userReact: null
    }
  },
  watch: {
    newData (newVal, oldVal) {
      if (newVal) {
        this.getCommentCount()
        this.newData = false
        this.actionSelected = ''
      }
      console.log('actualizando conteo de comentarios')
      console.log(newVal, oldVal)
    }
  },
  methods: {
    changeSelected (value) {
      this.actionSelected = value
    },
    getCommentCount () {
      commentService.getComments().then(resp => {
        this.commentCount = resp.filter(x => x.postId === this.identifier).length
        this.allComments = resp.filter(x => x.postId === this.identifier)
      })
      this.getReactions()
    },
    updateData (value) {
      this.newData = value
    },
    getReactions () {
      reactionService.getReactions().then(resp => {
        const reactions = resp?.filter(x => x.postId === this.identifier)
        this.reactionsPost = reactions
        this.likeCounter = reactions?.filter(x => x.type === 'like').length
        this.userReact = reactions?.find(x => x.userId === localStorage.getItem('currentUser'))
        if (this.userReact) { this.userReact.type = textTransform.resolveReactions(this.userReact.type) }
        console.log('reactions', reactions)
        console.log('count', this.userReact)
      })
    },
    setUserReact (react) {
      react.type = textTransform.resolveReactions(react.type)
      this.userReact = react
      this.getReactions()
    }
  },
  mounted () {
    this.getCommentCount()
    this.getReactions()
  }
}
</script>

<style lang="scss" scoped>
@import "../../variables";
@import "../../_mixins.scss";

.post {
  width: 100%;
  margin-top: 15px;
  border-radius: 15px;
  background-color: white;
  box-shadow: $shadow-setting-card;
  z-index: 2;
}

.post__top {
  @extend %content_userInfo;
}

.post__topInfo h3 {
  @extend %text-info;
}

.post__topInfo p {
  font-size: $size-text-small;
  color: $color-text-gray;
}

.post__bottom {
  padding: 15px 65px;
  & p {
    color: darken($color-text-gray, 5%);
    font-size: $size-text-content;
  }
}

.post__options {
  border-top: 1px solid lighten($color-text-gray, 30%);
  display: flex;
  justify-content: space-evenly;
  font-size: $size-text-action;
  color: $color-text-gray;
  cursor: pointer;
  padding: 15px;
}

%option {
  font-weight: bold;
  color: $color-text-black;
}

.post__option {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  flex: 1;
  & label {
    margin-left: 10px;
    @extend %option;
  }
  & p {
    margin-left: auto;
    margin-right: 10px;
    @extend %option;
  }
}

.post__option:hover {
  background-color: #eff2f5;
  border-radius: 10px;
}

.user__avatar {
  @include avatar(45px);
  margin-right: 10px;
}

.avatar_list {
  margin: 12px 0px;
  flex: 1;
  & .avatar__reactions:first-child {
    @include avatar_reacts(33px);
    margin-left: 0px;
  }
  & .avatar__reactions {
    @include avatar_reacts(35px);
    margin-left: -12px;
  }
  & span {
    @extend %info_reactions;
    margin-left: 15px;
  }
}

.content__actions {
  display: flex;
  margin: 18px 25px;
  & .content__comment__action {
    flex: 1;
    margin: 15px 0px;
    text-align: right;
    cursor: pointer;
    & span {
      @extend %info_reactions;
    }
  }
}

.label-reactions {
  margin: 0 auto;
  cursor: pointer;
}

.label-reacted {
  margin: 0 auto;
  color: $color-primary !important;
  cursor: not-allowed;
}

</style>
