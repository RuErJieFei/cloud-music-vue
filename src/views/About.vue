<template>
  <div>关于</div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>
<style scoped lang="scss">
.bottom-gradient {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}

.repeating-gradient {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(255, 0, 0, 0.25),
    rgba(255, 0, 0, 0.25) 5px,
    rgba(0, 0, 255, 0.25) 5px,
    rgba(0, 0, 255, 0.25) 10px
  );
}
</style>
