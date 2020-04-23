<template>
  <div>
    <q-btn
      v-for="(item ,index) in buttonList"
      :key="index"
      color="red-8"
      :label="item.title"
      type="submit"
    />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      buttonList: this.$store.state.menuList[this.$route.query.parentIndex].subMenus[this.$route.query.index].subMenus
    }
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>