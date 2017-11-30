<template>
  <div>
    <mt-header title="消息" fixed>
      <mt-button slot="left" icon="back" @click="$router.go(-1)">返回</mt-button>
    </mt-header>
    <div id="message">
      <mt-navbar v-model="selected">
        <mt-tab-item :id="1">未读信息</mt-tab-item>
        <mt-tab-item :id="2">已读信息</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" v-show="!loading">
        <mt-tab-container-item :id="1">
          <message-item v-for="message in hasnot_read_messages"
                        :key="message.id"
                        :author="message.author"
                        :create_at="message.create_at"
                        :has_read="message.has_read"
                        :id="message.id"
                        :reply="message.reply"
                        :topic="message.topic"
                        :type="message.type"
                        :accesstoken="accesstoken"
          ></message-item>
        </mt-tab-container-item>
        <mt-tab-container-item :id="2">
          <message-item v-for="message in has_read_messages"
                        :key="message.id"
                        :author="message.author"
                        :create_at="message.create_at"
                        :has_read="message.has_read"
                        :id="message.id"
                        :reply="message.reply"
                        :topic="message.topic"
                        :type="message.type"
                        :accesstoken="accesstoken"
          ></message-item>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>

  import {mapState} from 'vuex';
  import {Navbar, TabItem, Header, TabContainer, TabContainerItem, Indicator, Toast, Button} from 'mint-ui';
  import {getMessages} from '../../api/index';
  import MessageItem from './MessageItem.vue'

  export default {
    name: 'Message',
    components: {
      'mt-navbar': Navbar,
      'mt-tab-item': TabItem,
      'mt-header': Header,
      'mt-tab-container': TabContainer,
      'mt-tab-container-item': TabContainerItem,
      'message-item': MessageItem,
      'mt-button': Button
    },
    data: function () {
      return {
        selected: 2,
        loading: true,
        has_read_messages: [],
        hasnot_read_messages: []
      }
    },
    computed: {
      ...mapState('login', ['login', 'accesstoken'])
    },
    beforeMount: async function () {
      if (this.login === false) {
        this.$router.push({name: 'login'});
      } else {
        Indicator.open({
          spinnerType: 'snake'
        });
        const {data, success} = await getMessages(this.accesstoken);
        Indicator.close();
        this.loading = false;
        if (success) {
          this.has_read_messages = data.has_read_messages;
          this.hasnot_read_messages = data.hasnot_read_messages;
        } else {
          Toast({
            message: '出错了',
            duration: 2000,
            position: 'bottom'
          });
        }
      }
    },
  }

</script>

<style>
  #message {
    margin-top: 40px;
  }
</style>
