<template>
  <div class="postItem" @click="itemClickHandler">
    <h3 class="title">{{title}}</h3>
    <div class="content">
      <img class="avatar" :src="author_url" @click="avatarHandler"/>
      <div class="info">
        <div class="detail">
          <span>{{author_name}}</span>
          <span><b>{{reply_count}}</b>/{{visit_count}}</span>
        </div>
        <div class="time">
          <span>{{create_time}}</span>
          <span>{{last_reply_time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import _ from 'lodash';
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')

  export default {
    name: 'TopicListItem',
    props: {
      id: String,
      title: String,
      reply_count: Number,
      visit_count: Number,
      create_at: String,
      last_reply_at: String,
      author: {
        validator: function (value) {
          return value !== undefined && value.hasOwnProperty('loginname')
            && value.hasOwnProperty('avatar_url')
        }
      }
    },
    computed: {
      create_time: function () {
        return moment(this.create_at).fromNow()
      },
      last_reply_time: function () {
        return moment(this.last_reply_at).fromNow()
      },
      author_name: function () {
        if(!this.author){
          console.log('author is null')
        }else {
          return this.author.loginname;
        }
      },
      author_url: function () {
        if(!this.author){
          console.log('author is null')
        }else {
          return this.author.avatar_url;
        }
      }
    },
    methods: {
      itemClickHandler: function () {
        this.$emit('itemClick', {
          id: this.id
        });
      },
      avatarHandler: function (event) {
        event.stopPropagation();
        this.$router.push({ name: 'user', params: { loginname: this.author.loginname}})
      }
    }
  }

</script>

<style scoped>
  .postItem {
    display: flex;
    flex-direction: column;
    height: 74px;
    padding: 10px 20px;
    border-bottom: 1px solid #d5dbdb;
    justify-content: space-between;
  }

  .postItem > .title {
    color: #2c3e50;
    font-size: 16px;
    line-height: 1.5;
    height: 25px;
    margin: 0px;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .postItem > .content {
    display: flex;
    margin-top: 10px;
    height: 40px;
    font-size: 12px;
    color: #34495e;
    font-family: "Helvetica-Neue", "Helvetica", Arial, sans-serif;
    overflow: hidden;

  }

  .content > .avatar {
    flex-basis: 40px;
    height: 40px;
    width: 40px;
    margin-right: 10px;
  }

  .content > .info{
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    height: 40px;
  }

  .info > .detail{
    display: flex;
    flex: 1;
    justify-content: space-between;
    height: 20px;
  }


  .info > .time{
    display: flex;
    flex: 1;
    justify-content: space-between;
    height: 20px;
  }
</style>
