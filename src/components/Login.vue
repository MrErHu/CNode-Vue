<template>
  <div>
    <mt-header title="登录" fixed>
      <mt-button slot="left" icon="back" @click="$router.go(-1)">返回</mt-button>
    </mt-header>
    <div class="login" :style="{height: this.wrapperHeight + 'px'}">
      <div class="loginField">
        <mt-field type='text' placeholder="请输入AccessToken" v-model="accesstoken"></mt-field>
      </div>
      <mt-button type="primary" size="large" @click="buttonClickHandler">登录</mt-button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import {Header, Button, Field, Toast} from 'mint-ui';
  import {verifyUserToken} from '../api';
  import {MUTATION_TYPES} from '../constant';

  export default {
    name: 'Login',
    data: function () {
      return {
        accesstoken: ''
      }
    },
    components: {
      "mt-header": Header,
      "mt-button": Button,
      "mt-field": Field
    },
    beforeCreate: function () {
      this.wrapperHeight = document.documentElement.clientHeight - 40;
    },
    methods: {
      ...mapActions('login', {
        updateLogin: MUTATION_TYPES.USER_LOGIN
      }),
      buttonClickHandler: async function () {
        if(this.accesstoken == ''){
          Toast({
            message: 'accessToken 不能为空',
            duration: 2000,
            position: 'bottom'
          });
          return;
        }
        const {success, ...data} = await verifyUserToken(this.accesstoken);
        if(success){
          Toast({
            message: '登录成功',
            duration: 2000,
            position: 'bottom'
          });
          this.updateLogin({
            ...data,
            accesstoken: this.accesstoken
          });
          this.$router.go(-1);
        }else{
          Toast({
            message: '密码错误',
            duration: 2000,
            position: 'bottom'
          });
        }
      }
    }
  }
</script>

<style>
  .login {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;

  }

  .login > .loginField {
    margin-bottom: 40px;
  }

</style>
