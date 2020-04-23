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
  name: 'Role',
  data() {
    return {
      buttonList: this.$store.state.menuList[this.$route.query.parentIndex].subMenus[this.$route.query.index].subMenus
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss"></style>
