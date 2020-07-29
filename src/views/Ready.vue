<!--  -->
<template>
  <router-view v-if="done" />
  <div v-else class="black-07">
    <!-- loading... -->
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import VueBase from '@/vueBase';
import { mapMutations } from 'vuex';

@Component({
  components: {}
})
export default class Ready extends VueBase {
  private done: boolean = false;

  private async mounted() {
    await this.$nextTick();

    this.$commit('loading', '拼命加载ing..');

    this.done = true;
    this.$commit('loading', false);
  }
}
</script>
<style scoped lang='less'>
</style>