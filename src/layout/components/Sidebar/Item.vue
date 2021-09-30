<template>
  <!-- <i v-if="bool1" class='sub-el-icon' :class='{icon: bool1}'/> -->
  <!-- <i v-if="bool2" class="el-icon-menu svg-icon"></i> -->
  <!-- <title v-if="sign">{{title}}</title> -->

  <!-- <i v-if="bool1" :class="icon" class="svg-icon"></i> -->
  <div class="svg-icon-wrapper">
    <font-awesome-icon v-if="bool2" :icon="[faType, faIcon]" class="svg-icon"/>
  </div>
  <span v-if="bool3">{{title}}</span>

</template>

<script>
// import { h } from 'vue'

export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    sign: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bool2: false,
      bool3: false,
      faType: '',
      faIcon: ''
    }
  },
  created() {
    if(this.icon) {
      this.bool2 = true
      if(this.icon.startsWith('fa')) {
        const idx = this.icon.indexOf('-')
        this.faType = this.icon.slice(0, idx)
        this.faIcon = this.icon.slice(idx+1)
      } else {
        this.faType = 'fa'
        this.faIcon = 'th-large'
      }
    }
    if(this.title) {
      this.bool3 = true
    }
  },
  // render(h, context) {
  //   console.log('context', context)
  //   const { icon, title } = context.props
  //   const vnodes = []

  //   if (icon) {
  //     if (icon.includes('el-icon')) {
  //       vnodes.push(<i class={[icon, 'sub-el-icon']} />)
  //     } else {
  //       vnodes.push(<svg-icon icon-class={icon}/>)
  //     }
  //   }

  //   if (title) {
  //     vnodes.push(<span slot='title'>{(title)}</span>)
  //   }
  //   return vnodes
  // },
}
</script>

<style scoped lang="scss">
.svg-icon-wrapper {
  display: inline-block;
  width: 30px;
  text-align: left;

  &>.svg-icon {
    margin-right: 0 !important;
  }
}
</style>
