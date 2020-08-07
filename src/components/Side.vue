<template>
  <div>
    <div v-show="!hide" @click="show = true" class="picon_zhankai-btn">
      <i class="a-icon picon_zhankai"></i>
    </div>
    <van-popup v-model="show" closeable position="right" :style="{ height: '100%', width: '40%' }">
      <div class="class_wrap">
        <div class="flex-layout select_type">
          <i @click="chooseModel(ii)" v-for="(i,ii) in icons" :key="ii" class="a-icon" :class="iconIndex===ii ? 'select picon_'+i : 'picon_'+i" />
        </div>
        <div @click="select()" class="class_box"><span class="class_box-title flex-layout-center line-clamp-1">全部</span></div>
        <div @click="select(type)" v-for="(imgs, type, key) in data" :key="key" class="class_box animate__animated animate__rollIn">
          <van-image height="100%" width="100%" fit="cover" :src="imgs[0].url + short">
            <template v-slot:loading> <van-loading /> </template>
          </van-image>
          <div class="class_box-title flex-layout-center line-clamp-1">{{ type }}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
  import VueBase from '@/vueBase'
  import { Popup } from 'vant'
  @Component({
    components: {
      [Popup.name]: Popup,
    },
  })
  export default class Name extends VueBase {
    // @Prop(Boolean)
    // private value!: boolean

    @Prop(Object)
    private data!: Type.Object
    @Prop(Boolean)
    private hide!: boolean

    private show: boolean = false
    private short: string = `?imageMogr2/thumbnail/${(window.screen.width / 3).toFixed(0)}x/blur/1x0/quality/75`
    private icons: string[] = ['topic', 'year', 'month']
    private iconIndex: number = 0
    // get computed() { return 'computed' }
    private async mounted() {
      await this.$nextTick()
    }

    private select(type: string | null) {
      this.$emit('select', type)
      this.show = false
    }

    private chooseModel(index: number) {
      this.iconIndex = index
      this.$emit('choose', this.icons[index])
    }

    // @Emit('change')
    // private change(e: MouseEvent) {}
    // @Watch('value', { immediate: true, deep: true })
    // private onSideChanged(val: boolean, oldVal: boolean) {
    //   console.log(val)
    // }
  }
</script>
<style scoped lang="less">
  .class_wrap {
    padding: 30px 0;
  }
  .class_box {
    position: relative;
    width: 80%;
    height: 120px;
    margin: 30px 0 0 10%;
    box-shadow: 0 0 0.7rem #999999;
    border-radius: 10px;
    overflow: hidden;
    &-title {
      height: 100%;
      font-weight: 700;
      font-size: 18px;
      position: absolute;
      top: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.37);
      color: #ffffff;
    }
  }
  .picon_zhankai-btn {
    bottom: 15%;
    transform: rotate(180deg);
    position: fixed;
    background: rgba(255, 255, 255, 0.7);
    right: 20px;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0 0 0.7rem #999999;
  }
  .picon_zhankai {
    color: #111;
    font-size: 18px;
  }
  .select_type {
    padding-top: 24px;
    margin: 0 10%;
    justify-content: space-between;
    .a-icon {
      font-size: 32px;
      color: rgba(0, 0, 0, 0.2);
    }
    .select {
      color: #333;
    }
  }
</style>
