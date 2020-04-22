<template>
  <div class="q-pa-md row justify-center items-center">
    <q-card class="my-card">
      <q-card-section class="bg-purple text-white">
        <div class="text-h6">需要选择一个角色</div>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn
          v-for="(item,index) in roles"
          :key="index"
          @click="choose(index)"
          flat
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
      username: this.$store.state.user.username,
      admin: {},
      roles: [],
      role: null,
      menu: null
    }
  },
  created() {
    this.axios({
      method: 'post',
      url: this.$store.state.url + '/sysAdmin/admin',
      params: {
        adminName: this.username
      }
    }).then((res) => {
      this.admin = res.data.data
      console.log(this.admin)
      for (let j = 0; j < this.admin.roles.length; j++) {
        this.getRole(this.admin.roles[j].roleId)
      }

      console.log(this.roles)
    })
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    getRole(roleId) {
      this.axios.get(this.$store.state.url + '/sysRole/' + roleId).then((res) => {
        this.role = res.data.data
        this.roles.push(this.role)
      })
    },
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
  height: 800px;
  line-height: 800px;
}

.my-card {
  width: 450px;
  height: 240px;
}

.q-card__actions {
  margin-top: 12%;
}
</style>