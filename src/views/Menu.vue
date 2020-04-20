<template>
  <div>菜单管理</div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      permissions: this.$store.state.menuList1[2].subMenus[1].permissions
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
