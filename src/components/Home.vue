<template>
  <div>
    <mt-header title="首页" fixed>
      <div v-if="login" slot="left" @click="userClickHandler">
        <icon name="user" type="class" :style="{fontSize: '24px'}"/>
      </div>
      <div v-if="!login" slot="right" @click="loginClickHandler">
        <icon name="login" type="class" :style="{fontSize: '24px'}"/>
      </div>
      <div v-else slot="right" @click="messageClickHandler">
        <icon name="message" type="class" :style="{fontSize: '24px'}"/>
      </div>
    </mt-header>
    <topic-list
      :key="tab"
      :topicList="topicList"
      @topLoading="topLoadingHandler"
      @bottomLoading="bottomLoadingHandler"
      @click="topicItemClickHandler"
    />
    <mt-tabbar v-model="tab" fixed>
      <mt-tab-item id='all'>
        <icon name="all" type="class" class="icon-font" slot="icon"></icon>
        全部
      </mt-tab-item>
      <mt-tab-item id="good">
        <icon name="good" type="class" class="icon-font" slot="icon"></icon>
        精华
      </mt-tab-item>
      <mt-tab-item id="share">
        <icon name="share" type="class" class="icon-font" slot="icon"></icon>
        分享
      </mt-tab-item>
      <mt-tab-item id="ask">
        <icon name="ask" type="class" class="icon-font" slot="icon"></icon>
        问答
      </mt-tab-item>
      <mt-tab-item id="job">
        <icon name="job" type="class" class="icon-font" slot="icon"></icon>
        招聘
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import {Header, Tabbar, TabItem, Button, Indicator} from 'mint-ui';
  import TopicList from './TopicList.vue';
  import {getTopicsList} from '../api';
  import {TAB} from '../constant';
  import '../assets/iconfont.css'
  import Icon from "../../node_modules/vue-icon-font/src/IconFont.vue";

  export default {
    name: 'Home',
    components: {
      Icon,
      'mt-header': Header,
      'mt-tabbar': Tabbar,
      'mt-tab-item': TabItem,
      'mt-button': Button,
      'topic-list': TopicList
    },
    data: function () {
      return {
        tab: TAB.ALL,
        topicList: []
      }
    },
    methods: {
      ...mapMutations('topic', [
        'changeTab'
      ]),
      topLoadingHandler: async function (cb) {
        const data = await getTopicsList(0, this.tab, this.limit, this.mdrender);
        this.topicList = [...data.data];
        cb();
      },
      bottomLoadingHandler: async function (cb) {
        const data = await getTopicsList(this.page, this.tab, this.limit, this.mdrender);
        this.topicList.push(...data.data);
        cb();
      },
      topicItemClickHandler: function ({id}) {
        this.$router.push({name: 'topic', params: {id}})
      },
      loginClickHandler: function () {
        this.$router.push({name: 'login'})
      },
      messageClickHandler: function () {
        this.$router.push({name: 'message'})
      },
      userClickHandler: function () {
        this.$router.push({name: 'user', params: {loginname: this.loginname}});
      }
    },
    computed: {
      page: function () {
        return this.topicList.length;
      },
      ...mapState('topic', {
        limit: state => state.limit,
        mdrender: state => state.mdrender
      }),
      ...mapState('login', {
        'login': state => state.login,
        'loginname': state => state.loginname
      })
    },
    watch: {
      tab: async function () {
        const data = await getTopicsList(0, this.tab, this.limit, this.mdrender);
        if (data.success) {
          this.topicList = data.data;
        } else {
          console.log('出错了');
        }
      }
    },
    beforeMount: async function () {
      const data = await getTopicsList(this.page, this.tab, this.limit, this.mdrender);
      if (data.success) {
        this.topicList = data.data;
      } else {
        console.log('出错了');
      }
    }
  }
</script>

<style>
  .icon-font {
    font-size: 24px;
  }
</style>
