<template>
  <div class="box-wrapper">
    <img src="http://placeimg.com/40/80/any" class="box spe" />
    <img src="http://placeimg.com/100/80/any" class="box spe" />
    <img src="http://placeimg.com/90/120/any" class="box spe" />
    <img src="http://placeimg.com/220/100/any" class="box spe" />
    <img src="http://placeimg.com/140/180/any" class="box spe" />
    <img src="http://placeimg.com/140/280/any" class="box spe" />
    <img src="http://placeimg.com/240/180/any" class="box spe" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import VueBase from '@/vueBase'

@Component({
  components: {},
})
export default class Index extends VueBase {
  // public constructor() {
  //   super();
  // }
  // private created() {}
  private async mounted() {
    await this.$nextTick()
  }
}
</script>

<style lang="less" scoped>
.box {
  -moz-page-break-inside: avoid;
  -webkit-column-break-inside: avoid;
  break-inside: avoid;
  // border: 1px solid #000;
  background: #909090;
}
.spe {
  float: left;
  margin-bottom: 1rem;
  width: 100%;
  height: auto;
  box-shadow: 0 0 .7rem #777777;
}
.box-wrapper {
  margin: 1rem;
  -moz-column-count: 3;
  -webkit-column-count: 3;
  column-count: 3;
  -moz-column-gap: 1rem;
  -webkit-column-gap: 1rem;
  column-gap: 1rem;
}
@media (max-width: 1280px) {
  .box-wrapper {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
  }
}
</style>
