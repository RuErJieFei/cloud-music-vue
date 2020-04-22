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
            @blur="getVerify"
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

          <div v-if="state">
            <img :src="verifyImg" @click="getVerify" />

            <q-input
              class="col-3"
              dense
              type="text"
              v-model="verifyCode"
              label="验证码"
              lazy-rules
              :rules="[
          val => val !== null && val !== '' || '不能为空'
        ]"
            />
          </div>

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
      username: '',
      password: null,
      accept: false,
      verifyCode: null,
      verifyImg: null,
      state: false,
      token: null,
      admin: {},
      role: {},
      roles: []
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: '您需要首先接受许可和条款'
        })
      } else {
        this.axios
          .post(this.$store.state.url + '/sysAdmin/login', {
            name: this.username,
            password: this.password,
            verifyCode: this.verifyCode
          })
          .then((res) => {
            this.token = res.data.data
            localStorage.setItem('token', this.token)
            let user = {
              username: this.username
            }

            localStorage.setItem('user', JSON.stringify(user))

            this.$store.commit('setUser', user)

            this.$router.push('/choose')
          })
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    onReset() {
      this.username = ''
      this.password = ''
      this.accept = false
      this.verifyCode = ''
    },

    getVerify() {
      this.axios
        .get(this.$store.state.url + '/verify', {
          params: {
            name: this.username
          }
        })
        .then((res) => {
          this.verifyImg = res.data.data
        })
      this.state = true
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
.col-3 {
  display: inline-block;
  margin-left: 30px;
}
</style>
