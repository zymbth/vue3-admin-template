<template>
  <div class="container">
    <!-- <div>Black Page: {{$options.name}}</div> -->
    <el-card class="box-card calendar-card">
      <el-calendar v-model="today">
        <template #dateCell="{data}" class="weekday">
          <div :class="data.isSelected ? 'bg-blue' : ''">
            {{ new Date(data.day).getDate() }} {{ data.isSelected ? '✔️' : '' }}
          </div>
        </template>
      </el-calendar>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      today: new Date()
    }
  }
}
</script>
