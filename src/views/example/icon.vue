<template>
  <div class="container" style="font-size: 30px">
    <div class="title">封装 svg 组件:</div>
    <div>
      <svg-icon iconClass="example" />
      <svg-icon iconClass="form" />
      <svg-icon iconClass="dashboard" style="font-size: 60px; color: red" />
      <svg-icon iconClass="user" style="color: green" />
    </div>
    <div class="title">Font Awesome Icon:</div>
    <div>
      <font-awesome-icon icon="spinner" spin-pulse style="color:gray" />
      <font-awesome-icon icon="user" size="lg" />
      <font-awesome-icon :icon="['far', 'face-smile']" size="3x" style="color:orange"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResourceDashboard',
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 24px;
  margin: 0.4em 0;
}
svg + svg {
  margin-left: 10px;
}
</style>
