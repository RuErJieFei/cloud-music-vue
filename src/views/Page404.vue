<template>
  <div>
    asd
    <transition>
      <button v-if="docState === 'saved'" key="saved">Edit</button>
      <button v-if="docState === 'edited'" key="edited">Save</button>
      <button v-if="docState === 'editing'" key="editing">Cancel</button>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  data() {
    return {
      docState: 'saved'
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    buttonMessage: function() {
      switch (this.docState) {
        case 'saved':
          return 'Edit'
        case 'edited':
          return 'Save'
        case 'editing':
          return 'Cancel'
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
