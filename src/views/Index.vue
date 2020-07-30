<template>
  <div>
    <div v-for="(imgs, date, key) in imgList" :key="key">
      <div>{{date}}</div>
      <div class="box-wrapper">
        <img @click="preview(date, index)" v-for="(img, index) in imgs" :key="index" v-lazy="img.url+short" class="box spe" />
      </div>
    </div>

    <van-image-preview v-model="show" :images="images" :show-index="true" :startPosition="index">
      <template v-slot:cover>
        <div style="color:#fff;">{{detail}}</div>
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
  private imgList: Type.Object = {}
  private images: string[] = []
  private show: boolean = false
  private index: number = 0
  private detail: Type.Object = {}
  private short: string = '?imageMogr2/thumbnail/180x/blur/1x0/quality/75|watermark/2/text/U2hhd25QaGFuZw==/font/5b6u6L2v6ZuF6buR/fontsize/240/fill/IzMzMw==/dissolve/89/gravity/SouthEast/dx/7/dy/7'

  private async created() {
    let res = await this.$ajax.qn.getList({ bucket: 'my-ablum', limit: 999 })
    res = res.map((item: string) => {
      const name = item.split('.')[0]
      const dateTime = name.substring(name.indexOf('/') + 1)
      const date = this.$utils.dayjs(+dateTime).format('YYYY-MM-DD')
      const url = 'http://photo.palxp.com/' + item
      return this.$Imap({ date, url })
    })
    const newData = this.$Ilist(res).groupBy((x: any) => x.get('date'))
    const imgList = JSON.parse(JSON.stringify(newData.toArray()))
    const result: Type.Object = {}
    for (const item of imgList) {
      result[item[0]] = item[1]
    }
    this.imgList = result
  }
  private async mounted() {
    await this.$nextTick()
  }

  private async preview(date: string, index: number) {
    this.images = this.imgList[date].map((item: Type.Object) => {
      return item.url
    })
    this.index = index
    this.show = true

    const res = await this.$ajax.qn.getExif(this.images[index])
    console.log(res)
    // this.detail = res
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
