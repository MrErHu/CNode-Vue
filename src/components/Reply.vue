<template>
  <div>
    <mt-header title="回复" fixed>
      <mt-button slot="left" icon="back" @click="$router.go(-1)">返回</mt-button>
    </mt-header>
    <div class="login">
      <div class="loginField">
        <mt-field class="input" type='textarea' rows="4" v-model="content"></mt-field>
      </div>
      <mt-button type="primary" size="large" @click="buttonClickHandler">回复</mt-button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {Header, Button, Field, Toast} from 'mint-ui';
  import {postReply} from '../api'

  export default {
    name: 'Reply',
    components: {
      'mt-header': Header,
      'mt-button': Button,
      'mt-field': Field
    },
    data: function () {
      return {
        content: ''
      }
    },
    computed: {
      ...mapState('login', {
        login: state => state.login,
        accesstoken: state => state.accesstoken,
      }),
      topic_id: function(){
        return this.$route.params.topic_id;
      },
      reply_id: function () {
        return this.$route.params.reply_id;
      }
    },
    methods: {
      verityLogin: function () {
        if (this.login === false) {
          this.$router.push({
            name: 'login'
          });
          return false;
        }
        return true;
      },
      async buttonClickHandler(){
        if(this.verityLogin()){
          const {success} = await postReply(this.topic_id,this.accesstoken, this.content, this.reply_id);
          if(success){
            this.$router.go(-1);
          }else {
            Toast({
              message: '出错了',
              duration: 2000,
              position: 'bottom'
            });
          }
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
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .loginField > .input{
    border: 1px solid #E5E5E5;
  }

</style>
