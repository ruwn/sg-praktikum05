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
            var url = 'http://localhost:3000/mailapi/folder/' + f;
            var para = {newval: nn};
            console.log("MailApi.renameFolder: " + url + "," + nn);
            return axios.put(url, para).then(function(response) {
              return response;
            });
          },
          deleteFolder: function(f) {
            var url = 'http://localhost:3000/mailapi/folder/' + f;
            return axios.delete(url).then(function(response) {
              return response;
            });
          },
          deleteMail: function(m) {
            var url = 'http://localhost:3000/mailapi/msg/' + m._id;
            console.log("MailApi.deleteMail: " + url);
            return axios.delete(url).then(function(response) {
              return response;
            });
          }
        }, {});
      }();
      $__export("MailApi", MailApi);
    }
  };
});
