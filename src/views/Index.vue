<template>
  <div>
    <div v-show="testShow" class="animate__animated animate__fadeIn">
      <img class="title-pic animate__animated animate__bounceIn" src="http://photo.palxp.com/top/1596184256550.png" alt="">

      <div v-for="(imgs, date, key) in imgList" :key="key">
        <van-divider content-position="left">{{date}}</van-divider>
        <div class="box-wrapper">
          <van-image @click="preview(date, index)" :src="img.url+short" v-for="(img, index) in imgs" :key="index" lazy-load class="box spe">
            <template v-slot:loading> <van-loading /> </template>
          </van-image>
          <!-- <img @click="preview(date, index)" v-for="(img, index) in imgs" :key="index" v-lazy="img.url+short" class="box spe" /> -->
        </div>
      </div>

      <van-image-preview v-model="show" :images="images" @close="previewClose" :show-index="true" :startPosition="index">
        <template v-slot:cover>
          <div style="height:7rem;" class="pic_detail-wrap">
            {{detail}}
          </div>
        </template>
      </van-image-preview>
    </div>
    <!-- lock结构 -->
    <div class="animate__animated lock" :class="animateClass">
      <van-image height='100vh' width="100vw" fit="cover" :src="tempImg" />
      <div @click="test" class="wrap">
        <div class="a-icon picon_zhiwen"></div>
      </div>
    </div>
    <!-- lock结构结束 -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import VueBase from '@/vueBase'
import { Lazyload, Loading, ImagePreview, Divider } from 'vant'
Vue.use(Lazyload, { /** loading: './favicon.ico', */ })

@Component({
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
    [Divider.name]: Divider,
    [Loading.name]: Loading
  },
})
export default class Index extends VueBase {
  // public constructor() {
  //   super();
  // }
  /**
   * lock 变量
   */
  private testShow: boolean = false
  private tempImg: string = 'http://photo.palxp.com/top/1596184266925.jpeg'
  private animateClass: string = ''

  private imgList: Type.Object = {}
  private images: string[] = []
  private show: boolean = false
  private index: number = 0
  private detail: Type.Object = {}
  private short: string =
    '?imageMogr2/thumbnail/180x/blur/1x0/quality/75|watermark/2/text/U2hhd25QaGFuZw==/font/5b6u6L2v6ZuF6buR/fontsize/240/fill/IzMzMw==/dissolve/89/gravity/SouthEast/dx/7/dy/7'

  private async created() {
    let res = await this.$ajax.qn.getList({ bucket: 'my-ablum', limit: 999 })
    res = res.map((item: string) => {
      const name = item.split('.')[0]
      // let topic = 'Daily'
      // if (name.indexOf('/') !== -1) {
      //   topic = name.split('/')[0]
      // }

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

    //   const topicData = this.$Ilist(res).groupBy((x: any) => x.get('topic'))
    //   const imgListByTopic = JSON.parse(JSON.stringify(topicData.toArray()))
    //   const result2: Type.Object = {}
    //   for (const item of imgListByTopic) {
    //     result2[item[0]] = item[1]
    //   }
    //  console.log(result2);
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
    let trans_field = [
      // ExposureTime: '曝光',
      {
        name: '光圈',
        key: 'FNumber'
      },{
        name: '快门',
        key: 'ShutterSpeedValue'
      },{
        name: 'ISO',
        key: 'ISOSpeedRatings'
      },{
        name: '型号',
        key: 'Model'
      }
    ]
    trans_field = trans_field.map((item: any) => {
      item.val = res[item.key]?res[item.key].val:''
      return item
    })
    this.detail = trans_field
  }
  private previewClose() {
    this.images = []
    this.index = 0
  }
  /**
   * lock 方法
   */
  private test() {
    this.animateClass = 'animate__fadeOutUp'
    setTimeout(() => {
      this.testShow = true
    }, 100)
  }
  /**
   * lock 方法结束
   */
}
</script>

<style lang="less" scoped>
.lock {
  height: 100vh;
  width: 100vw;
  position: fixed;
  overflow: hidden;
  top: 0;
  .wrap {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    .picon_zhiwen {
      text-align: center;
      margin-top: 77vh;
      color: rgba(255, 255, 255, 0.7);
      font-size: 7.7rem;
    }
  }
}



.pic_detail-wrap {
  color:#fff;
  position: fixed;
  width: 100%;
  bottom: 0;
}





.title-pic {
  width: 100%;
}
.box {
  -moz-page-break-inside: avoid;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
  // border: 1px solid #000;
  // background: #909090;
}
.spe {
  float: left;
  margin-bottom: 1rem;
  width: 100%;
  height: auto;
  // box-shadow: 0 0 0.7rem #777777;
  // border-radius: 7px;
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
