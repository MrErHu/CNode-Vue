import _ from 'lodash'
import {get, post} from '../utils'

/**
 * 获得topicList
 * @param page
 * @param tab
 * @param limit
 * @param mdrender
 * @returns {Promise.<void>}
 */
function getTopicsList(page, tab, limit = 20, mdrender = false) {
  const url = `https://cnodejs.org/api/v1/topics?page=${page}&tab=${tab}&limit=${limit}&mdrender=${mdrender}`
  return get(url);
}


function getTopicDetail(id, accesstoken) {
  let url = `https://cnodejs.org/api/v1/topic/${id}?mdrender=true`;
  if (!_.isNil(accesstoken)) {
    url += `&accesstoken=${accesstoken}`
  }
  return get(url);
}

function getUserInfo(loginname) {
  let url = `https://cnodejs.org/api/v1/user/${loginname}`;
  return get(url);
}

function getUserCollect(loginname) {
  let url = `https://cnodejs.org/api/v1/topic_collect/${loginname}`;
  return get(url).then((data) => {
    if (data.success) {
      return data.data.map((item) => ({
        id: item.id,
        author: item.author,
        title: item.title,
        last_reply_at: item.last_reply_at
      }));
    }
  });
}

function verifyUserToken(accessToken) {
  let url = `https://cnodejs.org/api/v1/accessToken`;
  return post(url, {
    accesstoken: accessToken
  });
}

function collectTopic(topic_id, accesstoken) {
  let url = `https://cnodejs.org/api/v1/topic_collect/collect `;
  return post(url, {
    topic_id,
    accesstoken
  });
}

function deCollectTopic(topic_id, accesstoken) {
  let url = `https://cnodejs.org/api/v1/topic_collect/de_collect `;
  return post(url, {
    topic_id,
    accesstoken
  });
}

function upComment(reply_id, accesstoken) {
  let url = `https://cnodejs.org/api/v1/reply/${reply_id}/ups`;
  return post(url, {
    accesstoken
  });
}

function getMessages(accesstoken, mdrender = true) {
  let url = `https://cnodejs.org/api/v1/messages?accesstoken=${accesstoken}&mdrender=${mdrender}`;
  return get(url);
}

function markOneMessage(msg_id, accesstoken) {
  let url = `https://cnodejs.org/api/v1/message/mark_one/${msg_id}`;
  return post(url, {
    accesstoken
  });
}

function postReply(topic_id, accesstoken, content, reply_id) {
  let url = `https://cnodejs.org/api/v1/topic/${topic_id}/replies`;
  return post(url, {
    accesstoken,
    content,
    reply_id
  });
}


export {
  getUserInfo,
  getUserCollect,
  getTopicsList,
  getTopicDetail,
  verifyUserToken,
  collectTopic,
  deCollectTopic,
  upComment,
  getMessages,
  markOneMessage,
  postReply
};
