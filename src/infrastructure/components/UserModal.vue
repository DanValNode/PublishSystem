<template>
  <div class="cover">
  </div>
  <div class="container-modal">
    <div class="modal-content" id="modalPopup">
      <img src="https://freesvg.org/img/SEIR-net.png" alt="cookies-img" />
      <p v-show="buttonText === 'Registrar'">No hemos encontrado tu usuario, por favor ingresa tu nombre</p>
      <input type="text"
             name="username"
             :value="username"
             maxlength="20"
             v-on:change="changeUser"
             placeholder="Danos tu nombre de usuario" />
      <input v-show="registered"
             type="text" maxlength="20"
             name="name" :value="name"
             v-on:change="changeName"
             placeholder="Dinos tu nombre" />
      <button class="accept" v-if="registered" v-on:click="newUser">{{ buttonText }}</button>
      <button class="accept" v-if="!registered" v-on:click="getUser">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script>
import { profileService } from '@/domain/services/Profile.service'
import { generateUid } from '@/infrastructure/utils/uid'

export default {
  name: 'UserModal',
  props: {
    handle: { type: Function }
  },
  data () {
    return {
      registered: false,
      buttonText: 'Verificar',
      username: '',
      name: ''
    }
  },
  methods: {
    getUser () {
      profileService.getProfiles().then(resp => {
        const userFound = resp.find(x => x.user === this.username)
        if (userFound !== undefined) {
          localStorage.setItem('currentUser', userFound.id)
          localStorage.setItem('currentName', userFound.name)
          // mostrar vista principal
          this.handle()
        } else {
          this.registered = true
          this.buttonText = 'Registrar'
        }
      })
    },
    newUser () {
      const user = {
        id: generateUid(),
        name: this.name,
        user: this.username
      }
      profileService.newProfile(user).then(resp => {
        localStorage.setItem('currentUser', resp.id)
        localStorage.setItem('currentName', resp.name)
        // mostrar vista principal
        this.handle()
      })
    },
    changeName (evt) {
      this.name = evt.target.value
    },
    changeUser (evt) {
      this.username = evt.target.value
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../variables";
@import "../../mixins";

.container-modal {
  position: fixed;
  z-index: 4;
  -webkit-box-shadow: -2px 7px 31px 13px lighten($color-primary, 40%);
  box-shadow: -2px 7px 31px 13px lighten($color-primary, 40%);
  top: 20%;
  left: 40%;
  margin-left: -100px;
}

@media only screen
and (max-width: 489px) {
  .container-modal {
    margin-left: -120px;
  }
}

@media only screen
and (min-width: 1024px) {
  .container-modal {
    margin-left: -30px;
  }
}

.modal-content {
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  color: #000;
  text-align: center;
  border-radius: 20px;
  padding: 30px 30px 70px;
  img {
    width: 82px;
    margin-bottom: 15px;
  }
  p {
    margin-bottom: 40px;
    font-size: 18px;
  }
  button.accept {
    background-color: $color-primary;
    border: none;
    border-radius: 5px;
    width: 200px;
    padding: 14px;
    font-size: 16px;
    color: white;
    box-shadow: $color-primary;
    cursor: pointer;
  }
}

input {
  @extend %published_input;
  margin-bottom: 10px;
  min-width: 280px;
}

.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: darken($color-background, 3%); /*dim the background*/
  opacity: 0.2;
}
</style>
