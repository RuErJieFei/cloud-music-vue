<template>
  <div class="q-pa-md row justify-center items-center">
    <q-card class="my-card">
      <q-card-section class="bg-red-8 text-white">
        <div class="text-h6">需要选择一个角色</div>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn
          v-for="(item,index) in roles"
          :key="index"
          @click="choose(index)"
          flat
          class="text-h4"
        >{{ item.roleName }}</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // 用户名从vuex取出
      username: this.$store.state.user.username,
      // 用户
      admin: {},
      // 角色列表
      roles: [],
      // 角色
      role: null,
      // 菜单
      menu: null
    }
  },
  created() {
    console.log(this.$store.state.token)
    //根据用户名获取该用户信息以及其所拥有的角色信息
    this.axios({
      method: 'post',
      url: this.$store.state.url + '/sysAdmin/admin',
      params: {
        adminName: this.username
      }
    }).then((res) => {
      this.admin = res.data.data
      // 分别获取角色的菜单
      for (let j = 0; j < this.admin.roles.length; j++) {
        this.getRole(this.admin.roles[j].roleId)
      }
    })
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    //根据角色id获取其所拥有的权限，带上token头
    getRole(roleId) {
      this.axios({
        method: 'get',
        url: this.$store.state.url + '/sysRole',
        headers: {
          Authorization: this.$store.state.token
        },
        params: {
          roleId: roleId
        }
      }).then((res) => {
        this.role = res.data.data
        // 将单独一个角色的信息放入列表中
        this.roles.push(this.role)
      })
    },
    // 将选择的角色的对应菜单个个人信息存入vuex和本地缓存
    save() {
      let user = {
        userId: this.admin.id,
        username: this.username,
        userRole: this.role.roleName,
        avatar: this.admin.avatar
      }
      let menuList = this.menu
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('menuList', JSON.stringify(menuList))
      this.$store.commit('setUser', user)
      this.$store.commit('setMenuList', menuList)

      this.$router.push('/')
    },
    // 选择相应角色
    choose(index) {
      this.role = this.roles[index]
      this.menu = this.role.menus
      this.save()
    }
  }
}
</script>
<style lang="scss" scoped>
.q-pa-md {
  height: 600px;
}

.my-card {
  width: 450px;
  height: 240px;
}

.q-card__actions {
  margin-top: 2%;
}

button {
  width: 140px;
  height: 140px;
}
</style>