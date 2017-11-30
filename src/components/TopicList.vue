<template>
  <div id="topicList" :style="{ height: wrapperHeight + 'px' }">
    <mt-loadmore
      :top-method="topMethodHandler"
      ref="loadmore"
    >
      <div
        v-infinite-scroll="bottomMethodHandler"
        :infinite-scroll-disabled="true"
        infinite-scroll-distance="10"
      >
        <topic-list-item
          v-for="item in topicList"
          :key="item.id"
          :id="item.id"
          :title="item.title"
          :reply_count="item.reply_count"
          :visit_count="item.visit_count"
          :create_at="item.create_at"
          :last_reply_at="item.last_reply_at"
          :author="item.author"
          @itemClick="itemClickHandler"
        />
        <p v-show="bottomLoadingTip" class="page-infinite-loading">
          <mt-spinner type="triple-bounce"></mt-spinner>
        </p>
      </div>
    </mt-loadmore>
  </div>
</template>


<script>
  import Vue from 'vue';
  import { Loadmore, Indicator, InfiniteScroll, Spinner } from 'mint-ui';
  import TopicListItem from './TopicListItem.vue';

  Vue.use(InfiniteScroll);

  export default {
    name: 'TopicList',
    props: {
      topicList: Array
    },
    data: function () {
      return {
        bottomLoadingTip: false,
        bottomLoading: true
      }
    },
    components: {
      'mt-loadmore': Loadmore,
      'topic-list-item': TopicListItem,
      'mt-spinner': Spinner
    },
    beforeCreate: function () {
      this.wrapperHeight = document.documentElement.clientHeight - 55 - 40;
    },
    methods: {
      topMethodHandler: function () {
        const self = this;
        this.$emit('topLoading', function () {
          self.$refs.loadmore.onTopLoaded();
        });
      },
      bottomMethodHandler: function () {
        if(this.topicList && this.topicList.length > 0){
          let seft = this;
          this.bottomLoadingTip = true;
          this.$emit('bottomLoading', function () {
            self.bottomLoadingTip = false;
          });
        }
      },
      itemClickHandler: function ({id}) {
        this.$emit('click',{
          id
        });
      }
    },
    watch: {
      topicList: function (list) {
        const len = list.length;
        if(len === 0){
          Indicator.open({
            text: '加载中...',
            spinnerType: 'snake'
          });
        }else {
          Indicator.close();
        }
      }
    },
    beforeMount: function () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });
    }

  }
</script>

<style>

  #topicList {
    overflow-y: scroll;
    margin: 40px 0px 55px 0px;
  }

  .page-infinite-loading {
    text-align: center;
    height: 50px;
    line-height: 50px;
  }

  .page-infinite-loading >   {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }
</style>
