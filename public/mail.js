System.register("mail", ["angular2/angular2", "mailApi"], function($__export) {
  "use strict";
  var __moduleName = "mail";
  var Component,
      Template,
      bootstrap,
      For,
      MailApi,
      Mail;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      Template = $__m.Template;
      bootstrap = $__m.bootstrap;
      For = $__m.For;
    }, function($__m) {
      MailApi = $__m.MailApi;
    }],
    execute: function() {
      Mail = function() {
        function Mail(mailApi) {
          var $__0 = this;
          this.getFolder = mailApi.getAll;
          this.getMails = mailApi.getMails;
          this.rnFolder = mailApi.renameFolder;
          this.deleteMail = mailApi.deleteMail;
          this.debugAusgabe = '';
          this.myText = '';
          this.folders = [];
          this.resp = [];
          this.mails = [];
          this.neuerName = '';
          this.mailID = '';
          this.getFolder().then(function(resp) {
            $__0.folders = resp.data;
          });
        }
        return ($traceurRuntime.createClass)(Mail, {
          selectedButton: function(folder) {
            var $__0 = this;
            console.log("läuft");
            console.log(folder);
            this.getMails(folder).then(function(resp) {
              $__0.mails = resp.data;
            });
            console.log(this.mails.subject);
          },
          mailOpen: function(mailId) {
            var $__0 = this;
            console.log(mailId);
            this.myText = mailId.text;
            this.getMails(mailID).then(function(resp) {
              $__0.mails = resp.data;
            });
            console.log(mailId._id);
          },
          deleteFolder: function(folder) {
            console.log(folder);
          },
          renameFolder: function(folder, nn) {
            var $__0 = this;
            console.log("folder: " + folder + "  " + "neuer name: " + this.neuerName);
            this.rnFolder(folder, this.neuerName).then(function(resp) {
              $__0.debugAusgabe = resp.data;
            });
          },
          deleteMail: function(mail) {
            var $__0 = this;
            this.mailID = mail._id;
            console.log(this.mailID);
            this.deleteMail(mail._id).then(function(resp) {
              $__0.debugAusgabe = resp.data;
            });
          },
          setNeuerName: function(nname) {
            console.log(nname.value);
            this.neuerName = nname.value;
          }
        }, {});
      }();
      Object.defineProperty(Mail, "annotations", {get: function() {
          return [new Component({
            selector: 'mail',
            services: [MailApi]
          }), new Template({
            inline: "\n<div>{{debugAusgabe}}</div>\n\n<div *for=\"#folder of folders\">\n    <div class=\"new-user-button\">\n        <button class=\"ru-button --primary\" (click)=\"selectedButton(folder)\" > {{folder}} </button>\n\n        <button (click) = \"deleteFolder(folder)\">deleteFolder </button>\n        <input type=\"text\" #nname (keyup)=\"setNeuerName(nname)\"></input>\n        <button (click) = \"renameFolder(folder,nname.text)\">renameFolder</button>\n\n    </div>\n</div>\n<div *for=\"#mail of mails\">\n    <button class=\"ru-button --primary\" (click)=\"mailOpen(mail)\" >     <strong>Subject: </strong> {{mail.subject}} <strong> Date:</strong> {{mail.date}} </button>\n    <button (click) =\"deleteMail(mail)\">DeleteMail</button>\n</div>\n\n<div> {{myText}} </div>\n\n",
            directives: [For]
          })];
        }});
      Object.defineProperty(Mail, "parameters", {get: function() {
          return [[MailApi]];
        }});
      bootstrap(Mail);
    }
  };
});
