import AsyncStorage from "@react-native-async-storage/async-storage";
// import { name as appName } from "../../app.json";

const Api = {
  // _base: "https://www.gomarry.com",
  // _host: "www.gomarry.com",
  _base: "http://74.208.169.133",
  _host: "dev.gomarry.com",

  _call: (method, parameters) => {
    return new Promise(async (resolve, reject) => {
      var data = new FormData();
      for (var key in parameters) {
        data.append(key, parameters[key]);
      }
      AsyncStorage.getItem("mygomarry_token").then((token) => {
        console.log(token);

        data.append("token", token);
        global.token = token;
        fetch(Api._base + "/api/" + method, {
          method: "POST",
          body: data,
          headers: Api.headers(),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            if (response.ok) {
              if (method === "login" || method === "register") {
                global.token = response.data.token;
                AsyncStorage.setItem("mygomarry_token", response.data.token);
              }
              resolve(response.data);
            } else {
              reject(response.message);
              // throw response.message;
            }
          })
          .catch((error) => {
            reject(error.toString());
            // throw response.message;
          });
      });
    });
  },

  uri: (uri) => {
    return {
      uri: uri,
      headers: Api.headers(),
    };
  },

  headers: () => {
    return {
      Host: Api._host,
      "X-Auth-Token": global.token,
    };
  },

  login: (username, password) => {
    return Api._call("login", { username: username, password: password });
  },

  logout(device_id, device_token) {
    return Api._call("logout", {
      device_id: device_id,
      device_token: device_token,
    });
  },

  register: (
    gender,
    month,
    day,
    year,
    email,
    verify_email,
    password,
    discovery
  ) => {
    return Api._call("register", {
      gender: gender,
      month: month,
      day: day,
      year: year,
      email: email,
      verify_email: verify_email,
      password: password,
      discovery: discovery,
    });
  },
  verifyAccount: (code) => {
    return Api._call("verifyAccount", { code: code });
  },
  resendVerificationCode: () => {
    return Api._call("resendVerificationCode", {});
  },

  locationSearch: (query) => {
    return Api._call("locationSearch", { query: query });
  },

  whoami: () => {
    global.token;
    return Api._call("whoami");
  },

  updateProfile: (section, data) => {
    data["section"] = section;
    return Api._call("updateProfile", data);
  },

  completeSignupStage1: (username, tagline, latitude, longitude) => {
    return Api._call("complete", {
      stage: 1,
      username: username,
      tagline: tagline,
      latitude: latitude,
      longitude: longitude,
    });
  },

  completeSignupStage2: () => {
    return Api._call("complete", { stage: 2 });
  },

  completeSignupStage3: () => {
    return Api._call("complete", { stage: 3 });
  },

  search: (parameters, page, count) => {
    parameters["page"] = page;
    parameters["count"] = count;

    return Api._call("search", parameters);
  },

  interests: (filter, page, count) => {
    var parameters = {
      filter: filter,
      page: page,
      count: count,
    };
    return Api._call("interests", parameters);
  },

  profile: (username) => {
    var parameters = {
      username: username,
    };

    return Api._call("profile", parameters);
  },
  toggleFavourite: (friend_id) => {
    var parameters = {
      friend_id: friend_id,
    };

    return Api._call("toggleFavourite", parameters);
  },

  toggleInvite: (friend_id) => {
    var parameters = {
      friend_id: friend_id,
    };

    return Api._call("toggleInvite", parameters);
  },

  toggleBlocked: (friend_id) => {
    var parameters = {
      friend_id: friend_id,
    };

    return Api._call("toggleBlocked", parameters);
  },
  reset: (email) => {
    return Api._call("reset", {
      email: email,
    });
  },

  changePassword: (current_pass, new_pass, verify_pass) => {
    return Api._call("changePassword", {
      cpass: current_pass,
      npass: new_pass,
      rpass: verify_pass,
    });
  },

  changeEmail: (current_email, new_email, verify_email) => {
    return Api._call("changeEmail", {
      cemail: current_email,
      nemail: new_email,
      remail: verify_email,
    });
  },

  deleteViewedUser: (friend_id) => {
    return Api._call("deleteViewedUser", {
      friend_id: friend_id,
    });
  },

  reportUser: (friend_id, reason) => {
    return Api._call("reportUser", {
      friend_id: friend_id,
      reason: reason,
    });
  },

  requests: (filter, page, count) => {
    return Api._call("requests", {
      filter: filter,
      page: page,
      count: count,
    });
  },

  photoRequest: (friend_id, album_id) => {
    return Api._call("photoRequest", {
      friend_id: friend_id,
      album_id: album_id,
    });
  },

  photoRequestRespond: (request_id, decision) => {
    return Api._call("photoRequestRespond", {
      request_id: request_id,
      decision: decision,
    });
  },

  getSurveyQuestion: (question_id) => {
    return Api._call("getSurveyQuestion", {
      question_id: question_id,
    });
  },

  setSurveyAnswer: (question_id, answer, weight, comments) => {
    return Api._call("setSurveyAnswer", {
      question_id: question_id,
      answer: answer,
      weight: weight,
      comments: comments,
    });
  },

  compareSurveyAnswers: (friend_id) => {
    return Api._call("compareSurveyAnswers", {
      friend_id: friend_id,
    });
  },

  updateTagLine: (tagline) => {
    return Api._call("updateTagLine", {
      tagline: tagline,
    });
  },

  deleteAccount: (current_pass) => {
    return Api._call("deleteAccount", {
      cpass: current_pass,
    });
  },
  rotatePicture: (alias, degrees) => {
    return Api._call("rotatePicture", {
      alias: alias,
      degrees: degrees,
    });
  },

  defaultPicture: (alias) => {
    return Api._call("defaultPicture", {
      alias: alias,
    });
  },

  deletePicture: (alias) => {
    return Api._call("deletePicture", {
      alias: alias,
    });
  },

  deleteVideo: (alias) => {
    return Api._call("deleteVideo", {
      alias: alias,
    });
  },

  registerDeviceToken(device_id, device_token) {
    return Api._call("registerDeviceToken", {
      device_id: device_id,
      device_token: device_token,
    });
  },

  registerIOSSubscription(transaction_id, receipt) {
    return Api._call("registerIOSSubscription", {
      transaction_id: transaction_id,
      receipt: receipt,
    });
  },

  registerAndroidSubscription(purchase_token, receipt, signature) {
    return Api._call("registerAndroidSubscription", {
      purchase_token: purchase_token,
      receipt: receipt,
      signature: signature,
    });
  },

  loadMailbox: (mailbox = "all", page = 1) => {
    return Api._call("loadMailbox", {
      mailbox: mailbox,
      page: page,
    });
  },

  toggleStarredConversation: (friend_id) => {
    return Api._call("toggleStarredConversation", {
      friend_id: friend_id,
    });
  },

  toggleArchivedConversation: (friend_id) => {
    return Api._call("toggleArchivedconversation", {
      friend_id: friend_id,
    });
  },

  // friend_id: the user id of the other person in the conversation
  loadConversation: (friend_id, message_id, before, mark_as_read, limit) => {
    let options = {
      friend_id: friend_id,
    };

    if (typeof message_id !== "undefined") {
      options.mid = message_id;
    }
    if (typeof before !== "undefined") {
      options.before = before ? 1 : 0;
    }
    if (typeof mark_as_read !== "undefined") {
      options.markAsRead = mark_as_read ? 1 : 0;
    }
    if (typeof limit !== "undefined") {
      options.limit = limit;
    }

    return Api._call("loadConversation", options);
  },

  isTypingTo: (friend_id) => {
    return Api._call("isTypingTo", {
      friend_id: friend_id,
    });
  },

  sendMessage: (friend_id, message) => {
    return Api._call("sendMessage", {
      friend_id: friend_id,
      message: message,
    });
  },

  // read: 1 for read, 0 for unread
  getNotificationCount: (read) => {
    return Api._call("getNotificationCount", {
      read: read ? 1 : 0,
    });
  },

  getNotifications: (page, itemsPerPage) => {
    return Api._call("getNotifications", {
      page: page,
      itemsPerPage: itemsPerPage,
    });
  },

  markNotificationsRead: (id) => {
    return Api._call("markNotificationsRead", { id: id });
  },

  createSupportTicket: (name, email, subject, message) => {
    return Api._call("createSupportTicket", {
      name: name,
      email: email,
      subject: subject,
      message: message,
    });
  },

  ping: () => {
    return new Promise(async (resolve, reject) => {
      var d = new Date();
      var time = d.getTime();
      var data = new FormData();
      data.append("time", time);

      fetch(Api._base + "/api/ping", {
        method: "POST",
        body: data,
        headers: Api.headers(),
      })
        .then((response) => response.json())
        .then((response) => {
          var d = new Date();
          var delta = d.getTime() - time;
          resolve(delta);
        })
        .catch((error) => {
          reject(error.toString());
        });
    });
  },
};

export default Api;
