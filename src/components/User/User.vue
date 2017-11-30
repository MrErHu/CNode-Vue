<template>
  <div>
    <mt-header title="用户" fixed>
      <mt-button slot="left" icon="back" @click="$router.go(-1)">返回</mt-button>
      <div v-if="show_loginout" slot="right" @click="loginOutHandler">
        <icon name="loginout" type="class" :style="{fontSize: '24px'}"/>
      </div>
    </mt-header>
    <div v-show="!loading">
      <div class="userDetail">
        <div class="userAvatar">
          <img class="avatar" :src="avatar_url"/>
          <span class="userName">{{loginname}}</span>
          <div class="detail">
            <span>积分:{{score}}</span>
            <span>注册于:{{create_time}}</span>
          </div>
        </div>
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item :id="1">最近发布</mt-tab-item>
        <mt-tab-item :id="2">最近回复</mt-tab-item>
        <mt-tab-item :id="3">收藏</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item :id="1">
          <div v-for="topic in recent_topics" class="contentItem" @click.stop="itemClickHandler(topic.id)">{{topic.title}}</div>
        </mt-tab-container-item>
        <mt-tab-container-item :id="2">
          <div v-for="reply in recent_replies" class="contentItem" @click.stop="itemClickHandler(reply.id)">
            {{reply.title}}
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item :id="3">
          <div v-for="collect in collects" class="contentItem" @click.stop="itemClickHandler(collect.id)">
            {{collect.title}}
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>

</template>

<script>
  import {mapMutations} from 'vuex';
  import {Header, Button, Indicator, Navbar, TabItem, TabContainer, TabContainerItem, Cell} from 'mint-ui';
  import {getUserInfo, getUserCollect} from '../../api';
  import {MUTATION_TYPES} from '../../constant'
  import moment from 'moment';

  export default {
    name: 'User',
    components: {
      "mt-header": Header,
      "mt-button": Button,
      "mt-navbar": Navbar,
      "mt-tab-item": TabItem,
      "mt-tab-container": TabContainer,
      "mt-tab-container-item": TabContainerItem,
      "mt-cell": Cell
    },
    data: function () {
      return {
        loading: true,
        selected: 1,
        loginname: this.$route.params.loginname,
        avatar_url: '',
        githubUsername: '',
        create_at: '',
        score: 0,
        recent_topics: [],
        recent_replies: [],
        collects: [],
      }
    },
    computed: {
      create_time: function () {
        return moment(this.create_at).fromNow();
      },
      show_loginout: function () {
        return this.$store.state.login.login && this.loginname === this.$store.state.login.loginname;
      }
    },
    methods: {
      ...mapMutations('login', {
        loginOut: MUTATION_TYPES.USER_LOGINOUT
      }),
      itemClickHandler: function (id) {
        this.$router.push({name: 'topic', params: {id}})
      },
      loginOutHandler: function () {
        this.loginOut();
      }
    },
    beforeMount: function () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });

      Promise.all([getUserInfo(this.loginname), getUserCollect(this.loginname)]).then(([data, collects])=>{
        if (data.success) {
          this.loading = false;
          Indicator.close();
          Object.keys(data.data).forEach((key) => {
            this[key] = data.data[key];
          });
        }
        this.collects = collects;
      });
    }
  }
</script>

<style>
  .userDetail > .userAvatar {
    display: flex;
    height: 180px;
    flex-direction: column;
    border-bottom: 1px solid #d5dbdb;
    justify-content: flex-end;
    align-items: center;
  }

  .userAvatar > .avatar {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }

  .userAvatar > .userName {
    font-weight: bold;
    font-size: 20px;
  }

  .userAvatar > .detail {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
  }

  .userAvatar > .detail > span {
    flex: 1;
    text-align: center;
    font-size: smaller;
  }

  .contentItem {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #d5dbdb;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0px 10px 0px 10px;
  }

</style>
