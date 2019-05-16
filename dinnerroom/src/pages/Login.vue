<template>
  <div class="sign_wrap">
    <!-- <span>仅管理员可用</span> -->
    <el-input v-model="name" placeholder="请输入用户名"></el-input>
    <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
    <el-button type="primary" @click="signin">登录</el-button>
  </div>
</template>

<script>
  export default {
    name: 'signin',
    data() {
      return {
        name: '',
        password: '',
        islogin: this.$store.getters.islogin
      }
    },
    mounted() {
        if (this.islogin) {
            this.$message({
                message: '您已登录',
                type: 'success'
            })
            window.history.back(-1);
        }
        else {
        this.$notify({
            message: '请先登录',
            type: 'warning',
            position:"top-left"
          })
        }
    },
    computed: {
		listenTags() {
			return this.$store.state.users.islogin;
		}
	},
    watch: {
      listenTags(val, oldVal) {
            this.islogin = val
      }
    },
    methods: {
      signin: function () {
        let _this = this;
        if (this.name.length < 1) {
          this.$message.error('用户名不能为空')
          return
        }
        
        if (this.password.length < 1) {
          this.$message.error('密码不能为空')
          return
        }
        let obj = {
            name: this.name,
            password: this.password
        }
        this.$store.dispatch('signIn',obj)
        setTimeout(() => {
            if (this.islogin){
                _this.$message({
                message: '登录成功',
                type: 'success'
                })
                delete _this.password;
                window.history.back(-1);
                }
            else {
                _this.$message.error('用户名或密码不正确')
            }
        }, 1200)
      },
    }
  }
</script>

<style>
  .sign_wrap {
    width: 300px;
    height: 100%;
    margin: 20px auto;
    align-self: center;
    justify-content: center;
    align-items: center;
  }

  .sign_wrap div {
    padding-bottom: 30px;
  }
</style>