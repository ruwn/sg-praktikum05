System.register("mailApi", [], function($__export) {
  "use strict";
  var __moduleName = "mailApi";
  var MailApi;
  return {
    setters: [],
    execute: function() {
      MailApi = function() {
        function MailApi() {}
        return ($traceurRuntime.createClass)(MailApi, {
          getAll: function() {
            var url = 'http://localhost:3000/mailapi/folders';
            console.log("funzt " + url);
            return axios.get(url).then(function(response) {
              return response;
            });
          },
          getMails: function(folder) {
            var url = 'http://localhost:3000/mailapi/shbyfolder/' + folder;
            console.log("MailApi.getMails: " + url);
            return axios.get(url).then(function(response) {
              return response;
            });
          },
          getMail: function(mailID) {
            var url = 'http://localhost:3000/mailapi/show/' + mailID;
            console.log("MailApi.getMails");
            return axios.get(url).then(function(response) {
              return response;
            });
          },
          renameFolder: function(f, nn) {
            var url = 'http://localhost:3000/mailapi/updfoldername/' + f;
            var para = {folder: nn};
            console.log("MailApi.renameFolder: " + url + "," + nn);
            return axios.put(url, para).then(function(response) {
              return response;
            });
          },
          deleteFolder: function(f) {
            var url = 'http://localhost:3000/mailapi/deletefolder/' + f;
            console.log("MailApi.deleteFolder");
            return axios.delete(url).then(function(response) {
              return response;
            });
          },
          deleteMail: function(m) {
            var url = 'http://localhost:3000/mailapi/deletemail/' + m;
            console.log("MailApi.deleteMail: " + url);
            return axios.delete(url).then(function(response) {
              return response;
            });
          },
          moveMail: function(m, newFolder) {
            var url = 'http://localhost:3000/mailapi/movemail/' + m;
            var para = {folder: newFolder};
            console.log("MailApi.renameFolder: " + url + "," + newFolder);
            return axios.put(url, para).then(function(response) {
              return response;
            });
          },
          createMail: function(s, e, b, t) {
            var url = 'http://localhost:3000/mailapi/createmail/';
            var para = {
              sender: s,
              recipients: e,
              subject: b,
              text: t
            };
            console.log("MailApi.createMal: " + url + "," + para);
            return axios.post(url, para).then(function(response) {
              return response;
            });
          }
        }, {});
      }();
      $__export("MailApi", MailApi);
    }
  };
});
