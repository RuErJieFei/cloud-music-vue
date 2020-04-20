<template>
  <div class="container justify-center items-center">
    <div class="row">
      <div class="form">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            class="col-12"
            dense
            v-model="username"
            label="用户名"
            hint="qq/微信/邮箱"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '不能为空']"
          />

          <q-input
            class="col-12"
            dense
            type="password"
            v-model="password"
            label="密码"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || '不能为空'
        ]"
          />

          <q-toggle v-model="accept" label="我同意用户条款" />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      menuList: [],
      openSimple: false,
      username: null,
      password: null,

      accept: false
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      if (this.accept !== true) {
        console.log('登陆失败')
      } else {
        console.log('成功')
        //模拟后端接口数据
        let user = {
          userId: '1000100193',
          username: 'baga',
          userRole: 'admin',
          avatar: 'https://ruerjiefei.oss-cn-hangzhou.aliyuncs.com/images/IMG_0682.jpeg'
        }
        this.menuList = [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/dashboard', subMenus: [] },
          {
            title: '音乐管理',
            icon: 'mdi-music',
            url: '',
            subMenus: [
              {
                title: '歌单管理',
                icon: 'mdi-domain',
                url: '/music-list',
                permissions: []
              },
              {
                title: '歌曲管理',
                icon: 'mdi-text',
                url: '/music',
                permissions: ['music:add', 'music:edit', 'music:delete']
              }
            ]
          },
          { title: 'About', icon: 'mdi-help-box', url: '/about', subMenus: [] }
        ]
        localStorage.setItem('token', 'EcIHTAWoGrmMVvTu2LPvuL-siq6hAfieVeehl-HTe_M')
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('menuList', JSON.stringify(this.menuList))
        this.$store.commit('setToken', 'EcIHTAWoGrmMVvTu2LPvuL-siq6hAfieVeehl-HTe_M')
        this.$store.commit('setUser', user)
        this.$store.commit('setMenuList', this.menuList)

        this.$router.push('/')
      }
    },

    onReset() {
      this.$refs.form.clear()
      this.username = null
      this.password = null
      this.accept = false
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  height: 600px;
  width: 100%;
}
.form {
  width: 400px;
}
</style>
