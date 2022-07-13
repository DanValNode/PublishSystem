<template>
  <div class="box" :id="`box-${identifier}`">
    <input type="checkbox" :id="identifier" class="field-reactions">

    <!-- Texto de ayuda -->
    <h3 class="text-desc">Presiona TAB para navegar por las reacciones y luego ENTER para elegir.</h3>

    <!-- Creamos el contenedor para mostrar los iconos -->
    <div class="toolbox"></div>

    <!-- Creamos los iconos para cada reacción -->
    <button class="reaction-like" v-on:click="addReact('like')"><span class="legend-reaction">Me gusta</span></button>
    <button class="reaction-love" v-on:click="addReact('love')"><span class="legend-reaction">Me encanta</span></button>
    <button class="reaction-haha" v-on:click="addReact('haha')"><span class="legend-reaction">Me divierte</span></button>
    <button class="reaction-wow" v-on:click="addReact('wow')"><span class="legend-reaction">Me asombra</span></button>
    <button class="reaction-sad" v-on:click="addReact('sad')"><span class="legend-reaction">Me entristece</span></button>
    <button class="reaction-angry" v-on:click="addReact('angry')"><span class="legend-reaction">Me enoja</span></button>
  </div>
</template>

<script>
import { reactionService } from '@/domain/services/Reaction.service'
import { generateUid } from '@/infrastructure/utils/uid'

export default {
  name: 'Reactions',
  props: {
    identifier: String,
    handle: { type: Function }
  },
  methods: {
    addReact (react) {
      const reaction = {
        id: generateUid(),
        type: react,
        postId: this.identifier,
        userId: localStorage.getItem('currentUser')
      }
      reactionService.newReaction(reaction).then(resp => {
        console.log('resp reaction', resp)
        this.handle(resp)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../variables";
.text-desc, [class*="reaction-"], .field-reactions, .field-reactions:checked:focus ~ .text-desc {
  clip: rect(1px, 1px, 1px, 1px);
  display: none;
}

.field-reactions:focus ~ .text-desc, .box:hover [class*="reaction-"], .field-reactions:checked ~ [class*="reaction-"] {
  clip: auto;
  overflow: visible;
  opacity: 1;
}

.main-title {
  background: #3a5795;
  padding: 10px;
  color: #fff;
  text-align: center;
  font-size: 16px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.text-desc {
  font-weight: normal;
  text-align: center;
  transform: translateY(-50px);
  white-space: nowrap;
  font-size: 13px;
  width: 100%;
}

[class*="reaction-"] {
  border: none;
  background-image: url(../components/img/icons.png);
  background-color: transparent;
  display: block;
  cursor: pointer;
  height: 48px;
  position: absolute;
  width: 48px;
  z-index: 11;
  transform-origin: 50% 100%;
  transform: scale(0.1);
  transition: all 0.8s;
  outline: none;
  will-change: transform;
  opacity: 0;
}

.box {
  position: absolute;
  left: calc(40% - 280px);
  width: 300px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  //visibility: hidden;
}

.field-reactions:focus ~ .label-reactions {
  border-color: rgba(88, 144, 255, 0.3);
}
.field-reactions:checked:focus ~ .label-reactions {
  border-color: transparent;
}

%option {
  font-weight: bold;
  color: $color-text-black;
}

.label-reactions {
  margin-left: 10px;
  @extend %option;
}

.toolbox {
  background: #fff;
  height: 52px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.15);
  width: 300px;
  border-radius: 40px;
  top: -30px;
  left: 0;
  position: absolute;
  //visibility: hidden;
  opacity: 0;
  transition: opacity 0.50s;
}

.legend-reaction {
  background: rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  box-sizing: border-box;
  color: #fff;
  display: inline-block;
  font-size: 11px;
  text-overflow: ellipsis;
  font-weight: bold;
  line-height: 20px;
  max-width: 850%;
  width: 90px;
  opacity: 0;
  overflow: hidden;
  padding: 0 6px;
  transition: opacity 50ms ease;
  left: 50%;
  position: absolute;
  text-align: center;
  top: -28px;
  transform: translateX(-50%);
}

.box:hover [class*="reaction-"] {
  transform: scale(0.8) translateY(-40px);
}
.box:hover [class*="reaction-"]:hover, .box:hover [class*="reaction-"]:focus {
  transition: all 0.2s ease-in;
  transform: scale(1) translateY(-35px);
}
.box:hover [class*="reaction-"]:hover .legend-reaction, .box:hover [class*="reaction-"]:focus .legend-reaction {
  opacity: 1;
}
.box:hover .toolbox {
  opacity: 1;
  //visibility: visible;
}
.box:hover .reaction-love {
  transition-delay: 0.03s;
}
.box:hover .reaction-haha {
  transition-delay: 0.09s;
}
.box:hover .reaction-wow {
  transition-delay: 0.12s;
}
.box:hover .reaction-sad {
  transition-delay: 0.15s;
}
.box:hover .reaction-angry {
  transition-delay: 0.18s;
}

.field-reactions:checked ~ [class*="reaction-"] {
  transform: scale(0.8) translateY(-40px);
}
.field-reactions:checked ~ [class*="reaction-"]:hover, .field-reactions:checked ~ [class*="reaction-"]:focus {
  transition: all 0.2s ease-in;
  transform: scale(1) translateY(-35px);
}
.field-reactions:checked ~ [class*="reaction-"]:hover .legend-reaction, .field-reactions:checked ~ [class*="reaction-"]:focus .legend-reaction {
  opacity: 1;
}
.field-reactions:checked ~ .toolbox {
  opacity: 1;
}
.field-reactions:checked ~ .toolbox,
.field-reactions:checked ~ .overlay {
  visibility: visible;
}
.field-reactions:checked ~ .reaction-love {
  transition-delay: 0.03s;
}
.field-reactions:checked ~ .reaction-haha {
  transition-delay: 0.09s;
}
.field-reactions:checked ~ .reaction-wow {
  transition-delay: 0.12s;
}
.field-reactions:checked ~ .reaction-sad {
  transition-delay: 0.15s;
}
.field-reactions:checked ~ .reaction-angry {
  transition-delay: 0.18s;
}

.reaction-like {
  left: 0;
  background-position: 0 -144px;
}

.reaction-love {
  background-position: 0 -192px;
  left: 50px;
}

.reaction-haha {
  background-position: 0 -96px;
  left: 100px;
}

.reaction-wow {
  background-position: 0 -288px;
  left: 150px;
}

.reaction-sad {
  background-position: 0 -240px;
  left: 200px;
}

.reaction-angry {
  left: 250px;
}

@media (min-width: 1400px) {
  .box {
    left: calc(30% - 320px);
  }
}

@media only screen
and (min-device-width: 375px)
and (max-device-width: 667px) {
  .box {
    left: calc(80% - 280px);
    //top: calc(100% - 32px);
  }
}

@media only screen
and (max-device-width: 374px) {
  .box {
    left: calc(50% - 150px);
    //top: calc(100% + 266px);
  }
}

</style>
