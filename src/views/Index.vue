<template>
  <div class="home">
    <div v-show="visiable" class="animate__animated animate__fadeIn">
      <van-image :height="windowWidth / 1.9" width="100vw" fit="cover" class="animate__animated animate__bounceIn" :src="topImg">
        <img class="take_photo" :style="'height:' + windowWidth / 1.9 + 'px;'" :src="require('../assets/images/take_photo.png')" alt="" />
      </van-image>

      <div v-for="(imgs, date, key) in imgList" :key="key">
        <van-divider content-position="left">{{ date }}</van-divider>
        <div class="box-wrapper">
          <van-image @click="preview(date, index)" :src="img.url + short" v-for="(img, index) in imgs" :key="index" lazy-load class="box spe">
            <template v-slot:loading> <van-loading /> </template>
          </van-image>
          <!-- <img @click="preview(date, index)" v-for="(img, index) in imgs" :key="index" v-lazy="img.url+short" class="box spe" /> -->
        </div>
      </div>

      <van-image-preview v-model="show" :images="images" @close="previewClose" class-name="image-preview-view" :show-index="true" :startPosition="index">
        <template v-slot:cover>
          <div class="pic_detail-wrap flex-layout">
            <div class="param flex-layout" v-show="detail.val" v-for="(detail, index) in details" :key="index">
              <span class="param-title">{{ detail.name }} :</span>
              <span>{{ detail.val }}</span>
            </div>
          </div>
        </template>
      </van-image-preview>
    </div>

    <lock v-model="visiable" />
    <side :hide="visiable==='hideSide'" :data="sideList" @select="sideSelect" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import VueBase from '@/vueBase'
  import { ImagePreview, Divider } from 'vant'
  import { TRANS_FIELD, GROUP_LEVEL, freezeObject } from '@/assets/data/constantParams'
  import Lock from '@/components/Lock.vue'
  import Side from '@/components/Side.vue'

  @Component({
    components: {
      [ImagePreview.Component.name]: ImagePreview.Component,
      [Divider.name]: Divider,
      Lock,
      Side,
    },
  })
  export default class Index extends VueBase {
    // public constructor() {
    //   super();
    // }
    private visiable: string = ''
    private imgList: Type.Object = {} // 图片列表
    private sideList: Type.Object = {} // 侧边列表
    private images: string[] = [] // 预览图组列表
    private show: boolean = false // 展示预览
    private index: number = 0 // 用于设置预览当前页
    private details: Type.Object = {} // 图片EXIF信息
    private topImg: string = '' // 置顶图片
    private short: string = `?imageMogr2/thumbnail/${(window.screen.width / 2).toFixed(0)}x/blur/1x0/quality/85|watermark/2/text/U2hhd25QaGFuZw==/font/5b6u6L2v6ZuF6buR/fontsize/240/fill/IzMzMw==/dissolve/89/gravity/SouthEast/dx/7/dy/7`

    public get windowWidth(): string | number {
      return this.$getters.windowWidth
    }

    private async created() {
      let res = await this.$ajax.qn.getList({ bucket: 'my-ablum', limit: 999 })
      this.imgList = this.assembly(res)
      freezeObject.allImgList = this.imgList
      freezeObject.topicImgList = this.assembly(res, 'topic')
      freezeObject.yearImgList = this.assembly(res, 'year')
      freezeObject.monthImgList = this.assembly(res, 'month')
      this.sideList = freezeObject.topicImgList
    }
    private async mounted() {
      await this.$nextTick()
      this.topImg = JSON.parse(localStorage.getItem('top_pic') + '')[0]
    }
    /**
     * 组装图片列表方法
     */
    private assembly(res: Type.Object, type: string = 'time') {
      res = res.filter((item: string) => {
        // 过滤不在规范内的图片
        const { dateTime } = this.parsing(item)
        if (!isNaN(dateTime)) {
          return item && item.trim()
        }
      })
      res = res.map((item: string) => {
        // 组装图片数据
        const { params, dateTime } = this.parsing(item)
        const group = params[params.length - GROUP_LEVEL[type]]
        const date = this.$utils.dayjs(dateTime).format('YYYY-MM-DD')
        const url = this.$utils.config.IMG_URL + item
        return { date, url, group }
      })

      const imgList = new this.$utils.GroupArray(res)
      const result: Type.Object = {}
      const key = type === 'time' ? 'date' : 'group'
      for (const item of imgList.groupByKey(key)) {
        result[item[0][key]] = item
      }
      result.undefined && delete result.undefined
      // const newResult = JSON.parse(JSON.stringify(result))
      return this.$utils.GroupArray.sortObj(result)
    }
    private parsing(item: string) {
      const params = item.split('.')[0].split('/')
      const dateTime = +params[params.length - 1]
      return { params, dateTime: +params[params.length - 1] }
    }
    /** -- END -- */

    /**
     * 图片预览相关
     */
    private async preview(date: string, index: number) {
      this.visiable = 'hideSide'
      this.images = this.imgList[date].map((item: Type.Object) => {
        return item.url
      })
      this.index = index
      this.show = true

      const res = await this.$ajax.qn.getExif(this.images[index])

      const transField = TRANS_FIELD.map((item: any) => {
        if (item.val) {
          try {
            item.val = eval('`' + item.val + '`')
          } catch (error) {
            item.val = ''
          }
        } else {
          item.val = res[item.key] ? res[item.key].val : ''
        }
        return item
      })
      this.details = transField
    }
    private previewClose() {
      this.visiable = 'start'
      this.images = []
      this.details = []
      this.index = 0
    }
    /** END */
    private sideSelect(type: string | null) {
      if (!type) {
        this.imgList = freezeObject.allImgList
        return
      }
      const obj: Type.Object = {}
      obj[type] = this.sideList[type]
      this.imgList = obj
    }
    // private chooseModel() {
      
    // }
  }
</script>

<style>
  .image-preview-view {
    background: #000000;
  }
</style>

<style lang="less" scoped>
  .home::-webkit-scrollbar {
    display: none; /* Chrome Safari */
    width: 0 !important;
  }
  .home {
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }

  .take_photo {
    position: absolute;
    top: 0;
    width: 100%;
  }

  .pic_detail-wrap {
    color: #fff;
    position: fixed;
    width: 100%;
    bottom: 0;
    flex-wrap: wrap;
    padding: 1rem 0;
    background: rgba(0, 0, 0, 0.6);
    .param {
      min-width: 50%;
      padding: 0.27rem 1rem;
    }
    .param-title {
      text-align: center;
      width: 42px;
    }
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
    overflow: hidden;
    // box-shadow: 0 0 0.7rem #777777;
    border-radius: 4px;
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
