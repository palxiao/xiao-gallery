<!--  -->
<template>
  <router-view v-if="done" />
  <div v-else class="black-07 loading-wrap flex-layout-center">
    <!-- loading... -->
    <div class="pipe">
      <div :style="'width:'+progress+'%;'" class="progress">
        <div style="padding-top:1rem;">{{progress}}%</div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import VueBase from '@/vueBase'
import { mapMutations } from 'vuex'
import { Image as VanImage } from 'vant'
import Preload from '@/utils/widget/preload'
Vue.use(VanImage)

@Component({
  components: {},
})
export default class Ready extends VueBase {
  private done: boolean = false
  private progress: number = 0

  private async mounted() {
    await this.$nextTick()

    let res = await this.$ajax.qn.getList({ bucket: 'my-ablum', prefix: 'top' })
    res = res.map((url: string) => {
      return 'http://photo.palxp.com/' + url
    })

    const preload = new Preload(res)
    const preDone = await preload.imgs((progress: any) => {
      this.progress = +progress.toFixed(0)
    })
    setTimeout(() => {
      this.done = true
    }, 300);

    // this.$commit('loading', '拼命加载ing..');
    // this.done = true
    // this.$commit('loading', false);
  }
}
</script>
<style scoped lang='less'>
.loading-wrap {
  height: 100vh;
  .pipe {
    width: 90%;
    height: 4px;
    .progress {
      background: #999;
      text-align: right;
      height: 100%;
    }
  }
}
</style>