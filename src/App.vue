<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  created() {
    this.$q.dark.set(true)
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {}
}
</script>
<style lang="scss">
.gutter {
  margin: 5px;
}
</style>
