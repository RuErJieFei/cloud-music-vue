<template>
  <q-layout view="hhh LpR ffr">
    <!-- 导航头 -->
    <q-header reveal elevated height-hint class="bg-red-8 text-white">
      <q-toolbar>
        <q-toolbar-title class="row justify-between">
          <!-- 项目名字 -->
          <span>Cloud Music</span>
          <!-- 个人选项 -->
          <div>
            <q-chip v-if="user" class="avatar">
              <!-- 下拉菜单 -->
              <q-menu :offset="[50, 10]">
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section @click="logout">退出登陆</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>嘻嘻嘻嘻</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
              <q-avatar>
                <img :src="user.avatar" />
              </q-avatar>
              {{ user.username}}
            </q-chip>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <!-- 左侧抽屉导航 -->
    <q-drawer
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      elevated
      content-class="bg-black-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <div>
            <q-expansion-item
              :icon="item.icon"
              :label="item.title"
              :default-opened="false"
              expand-separator
              expand-icon-class="text-dark"
              :header-style="{ color: '#ff0000' }"
              v-for="(item, parentIndex) in items"
              :key="parentIndex"
              :to="item.path"
            >
              <q-separator />
              <q-item
                clickable
                v-ripple
                :icon="menu.icon"
                :inset-level="0.5"
                v-for="(menu, i) in item.subMenus"
                :key="i"
                :to="{ path: menu.path , query: {parentIndex: parentIndex ,index: i } }"
                active-class="red"
                class="row items-center"
              >
                <q-icon :name="menu.icon" size="24px" class="q-mr-lg" />
                <q-item-section>{{menu.title}}</q-item-section>
              </q-item>
            </q-expansion-item>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- 中间的主页面 -->
    <q-page-container class="q-ma-xl full-height">
      <router-view />
    </q-page-container>

    <!-- 脚注 -->
    <q-footer reveal elevated height-hint="150" class="bg-red-8 text-white no-wrap">
      <q-toolbar>
        <q-toolbar-title>L S T</q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>



<script>
export default {
  name: 'Layout',
  data() {
    return {
      // 从vuex中取出用户
      user: this.$store.state.user,
      // 从vuex中取出菜单
      items: this.$store.state.menuList,
      // 菜单中的功能按钮
      buttonList: [],
      //左侧抽屉缩放
      miniState: true
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    // 退出登陆
    logout() {
      this.alert()
      localStorage.removeItem('token')
      this.$store.commit('setUser', null)
      this.$router.push('/login')
    },
    //退出提醒
    alert() {
      this.$q
        .dialog({
          title: '提示',
          style: 'color : #c23f38',
          message: '退出成功',
          ok: {
            color: 'red-8',
            label: 'OK'
          }
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
.avatar {
  cursor: pointer;
}
.red {
  color: #c3291c;
}
.height {
  height: 30px;
}
</style>
