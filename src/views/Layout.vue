<template>
  <div class="row">
    <div class="q-pa-md col-12">
      <q-toolbar class="bg-red text-white shadow-2 rounded-borders">
        <div class="text-h4">cloud-music</div>
        <q-space />

        <q-tabs>
          <q-tab name="tab1" label="Tab 1" />
          <q-tab name="tab2" label="Tab 2" />
          <q-tab name="tab3" label="Tab 3" />
          <q-chip v-if="user">
            <q-avatar @click="logout">
              <img :src="user.avatar" />
            </q-avatar>
            {{ user.username}}
          </q-chip>
          <div class="text-subtitle1" v-else>登陆</div>
        </q-tabs>
      </q-toolbar>
    </div>

    <div class="list col-3">
      <div class="q-pa-md" style="max-width: 350px">
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            icon="mail"
            :label="item.title"
            default-opened
            v-for="item in items"
            :key="item.title"
            :to="item.path"
          >
            <q-expansion-item
              :header-inset-level="1"
              expand-separator
              icon="receipt"
              :label="menu.title"
              default-closed
              v-for="(menu, i) in item.subMenus"
              :key="i"
              :to="menu.path"
            ></q-expansion-item>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
    <div class="col-8">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      user: this.$store.state.user,
      items: this.$store.state.menuList
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    logout() {
      this.alert()
      localStorage.removeItem('token')
      this.$store.commit('setUser', null)
      this.$router.push('/login')
    },
    alert() {
      this.$q
        .dialog({
          title: 'Alert',
          message: '退出成功'
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.list {
  min-width: 300px !important;
  margin-left: 2%;
}
</style>
