<template>
  <div>
    
    <div class="box-wrapper">
      <img @click="preview(index)" v-for="(img, index) in images" :key="index" v-lazy="img" class="box spe" />
    </div>

    <van-image-preview v-model="show" :images="images" :show-index="true" :startPosition="index">
      <template v-slot:cover>
        <div style="color:#fff;">231232</div>
      </template>
    </van-image-preview>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import VueBase from '@/vueBase'
import { ImagePreview } from 'vant'
import { Lazyload } from 'vant'
Vue.use(Lazyload, {
  // loading: './favicon.ico',
})

@Component({
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
})
export default class Index extends VueBase {
  // public constructor() {
  //   super();
  // }
  private images: string[] = [
    'http://placeimg.com/100/80/any',
    'http://placeimg.com/100/180/any',
    'http://placeimg.com/200/300/any',
    'http://placeimg.com/210/180/any',
    'http://placeimg.com/340/400/any',
    'http://placeimg.com/680/720/any',
    'http://placeimg.com/480/320/any',
    'http://placeimg.com/320/480/any',
    'http://placeimg.com/720/680/any',
    'http://placeimg.com/100/80/any',
    'http://placeimg.com/120/180/any',
    'http://placeimg.com/280/300/any',
    'http://placeimg.com/210/180/any',
    'http://placeimg.com/300/400/any',
    'http://placeimg.com/640/720/any',
    'http://placeimg.com/430/320/any',
    'http://placeimg.com/320/480/any',
    'http://placeimg.com/720/620/any',
  ]
  private show: boolean = false
  private index: number = 0
  // private created() {}
  private async mounted() {
    await this.$nextTick()
    const that = this
    // setTimeout(() => {
    //   this.exif.getData(document.getElementById('imgElement'), function(){
    //   console.log('????');
    //   console.log(that.exif.getAllTags(this));
    // });
    // }, 2000);
  }

  private preview(index: number) {
    this.show = true
    this.index = index

    const EXIF = (window as any).EXIF
    const img = new Image()
    img.src = this.images[index]
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      EXIF.getData(img, function(this: any) {
        console.log(EXIF.getAllTags(this))
      })
      img.onload = null
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  -moz-page-break-inside: avoid;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
  // border: 1px solid #000;
  background: #909090;
}
.spe {
  float: left;
  margin-bottom: 1rem;
  width: 100%;
  height: auto;
  box-shadow: 0 0 0.7rem #777777;
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
