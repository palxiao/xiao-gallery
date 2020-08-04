<!--  -->
<template>
  <div>
    <div @click="show = true" class="a-icon picon_zhankai"></div>
    <van-popup v-model="show" closeable position="right" :style="{ height: '100%', width: '40%' }">
      <div class="class_wrap">
        <div @click="select()" class="class_box flex-layout-center line-clamp-1">全部</div>
        <div @click="select(type)" v-for="(imgs, type, key) in data" :key="key" class="class_box flex-layout-center line-clamp-1">{{ type }}</div>
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

    private show: boolean = false
    // get computed() { return 'computed' }
    private async mounted() {
      await this.$nextTick()
    }

    private select(type: string | null) {
      this.$emit('select', type)
      this.show = false
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
    color: rgba(0, 0, 0, 0.7);
    font-weight: 700;
    font-size: 18px;
    width: 80%;
    height: 120px;
    margin: 30px 0 0 10%;
    box-shadow: 0 0 0.7rem #999999;
    border-radius: 10px;
  }
  .picon_zhankai {
    bottom: 15%;
    transform: rotate(180deg);
    position: fixed;
    background: rgba(255, 255, 255, 0.7);
    right: 20px;
    color: #888888;
    font-size: 18px;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0 0 0.7rem #999999;
  }
</style>
