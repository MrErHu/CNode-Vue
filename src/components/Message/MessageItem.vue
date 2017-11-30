<template>
  <div class="messageItem" @click.stop="itemClickHandler">{{content}}</div>
</template>

<script>

  import { MESSAGE_TYPE }  from '../../constant';
  import { markOneMessage } from '../../api'

  export default {
    name: "MessageItem",

    props: {
      author: Object,
      create_at: String,
      has_read: Boolean,
      id: String,
      reply: Object,
      topic: Object,
      type: String,
      accesstoken: String
    },

    computed: {
      content(){
        if(this.type === MESSAGE_TYPE.AT){
          return `${this.author.loginname} 在话题 ${this.topic.title} 进阶教程 中@了你`;
        }else {
          return `${this.author.loginname} 回复了你的话题 ${this.topic.title}`;
        }
      }
    },

    methods: {
      itemClickHandler: function () {
        this.$router.push({name: 'topic', params: {id: this.topic.id}});
        if(this.has_read === false){
          markOneMessage(this.id, this.accesstoken);
        }
      }
    }
  }
</script>

<style>

  .messageItem {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #d5dbdb;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0px 10px 0px 10px;
  }

</style>
