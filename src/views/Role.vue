<template>
  <div>角色管理</div>
</template>

<script>
export default {
  name: 'Role',
  data() {
    return {
      permissions: this.$store.state.menuList1[2].subMenus[0].permissions
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
