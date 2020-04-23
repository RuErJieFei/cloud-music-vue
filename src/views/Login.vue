<template>
  <div class="container justify-center items-center">
    <div class="row">
      <div class="form">
        <!-- 输入表单 -->
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <!-- 账号输入框 -->
          <q-input
            class="col-12"
            dense
            color="red-8"
            v-model="username"
            label="用户名"
            hint="qq/微信/邮箱"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '不能为空']"
            @blur="getVerify"
          />
          <!-- 密码输入框 -->
          <q-input
            class="col-12"
            dense
            color="red-8"
            type="password"
            v-model="password"
            label="密码"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || '不能为空'
        ]"
          />
          <!-- 验证码区域 -->
          <!-- 当指用户名输入区域针失焦状态改变显示验证码区域 -->
          <div v-if="state">
            <transition-group
              appear
              enter-active-class="animated fadeInDown"
              leave-active-class="animated fadeOut"
              class="row justify-center"
            >
              <img :src="verifyImg" @click="getVerify" key="verifyImg" alt="点击刷新" />

              <q-input
                class="col-3 q-ml-xl"
                dense
                color="red-8"
                type="text"
                v-model="verifyCode"
                label="验证码"
                lazy-rules
                :rules="[
          val => val !== null && val !== '' || '不能为空'
        ]"
                key="verifyCode"
              />
            </transition-group>
          </div>

          <q-toggle color="red-8" v-model="accept" label="我同意用户条款" />

          <div class="row justify-around">
            <q-btn color="red-8" label="登录" type="submit" />
            <q-btn color="red-8" label="重设" type="reset" flat class="q-ml-sm" />
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
      // 用户名
      username: '',
      // 密码
      password: null,
      // 接收用户条款
      accept: false,
      // 验证码
      verifyCode: null,
      // 验证码图片
      verifyImg: null,
      // 验证码模块开关
      state: false,
      // token
      token: null
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    // 提交登陆
    onSubmit() {
      // 接收用户条款
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-14',
          textColor: 'white',
          message: '您需要首先接受许可和条款'
        })
      } else {
        //验证登陆
        this.axios
          .post(this.$store.state.url + '/sysAdmin/login', {
            name: this.username,
            password: this.password,
            verifyCode: this.verifyCode
          })
          .then((res) => {
            //验证码错误
            if (res.data.code == 20004) {
              this.$q.notify({
                color: 'red-14',
                textColor: 'white',
                message: res.data.msg
              })
              //密码错误
            } else if (res.data.code == 20002) {
              this.$q.notify({
                color: 'red-14',
                textColor: 'white',
                message: res.data.msg
              })

              //当用户不存在
            } else if (res.data.code == 20009) {
              this.$q.notify({
                color: 'red-14',
                textColor: 'white',
                message: res.data.msg
              })
            } else {
              this.token = res.data.data.token
              localStorage.setItem('token', this.token)
              this.$store.commit('setToken', this.token)
              let user = {
                username: this.username
              }
              localStorage.setItem('user', JSON.stringify(user))
              this.$store.commit('setUser', user)
              this.$q.notify({
                color: 'red-8',
                textColor: 'white',
                message: res.data.msg
              })

              this.$router.push('/choose')
            }
          })
      }
    },

    //清空输入框
    onReset() {
      this.username = ''
      this.password = ''
      this.accept = false
      this.verifyCode = ''
    },
    //axios请求验证码接口
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
        .catch((error) => console.log(error))
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

img {
  cursor: pointer;
}

.col-3 {
  display: inline-block;
}
</style>
