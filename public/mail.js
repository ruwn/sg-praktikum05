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
          this.delMail = mailApi.deleteMail;
          this.delFolder = mailApi.deleteFolder;
          this.mvMail = mailApi.moveMail;
          this.crMail = mailApi.createMail;
          this.debugAusgabe = '';
          this.myText = '';
          this.folder = '';
          this.folders = [];
          this.resp = [];
          this.mails = [];
          this.neuerNameFolder = '';
          this.neuerNameMail = '';
          this.mailID = '';
          this.getFolder().then(function(resp) {
            $__0.folders = resp.data;
          });
        }
        return ($traceurRuntime.createClass)(Mail, {
          selectedButton: function(folder) {
            var $__0 = this;
            this.folder = folder;
            console.log("läuft");
            console.log(folder);
            this.getMails(folder).then(function(resp) {
              $__0.mails = resp.data;
            });
            console.log(this.mails.subject);
          },
          mailOpen: function(mail) {
            var $__0 = this;
            console.log(mail);
            this.myText = mail.text;
            this.getMails(mail).then(function(resp) {
              $__0.mails = resp.data;
            });
            console.log(mail._id);
          },
          removeFolder: function(folder) {
            var $__0 = this;
            console.log("Mail.remove " + folder);
            this.delFolder(folder).then(function(resp) {
              $__0.debugAusgabe = resp._id;
            });
            this.getFolder().then(function(resp) {
              $__0.folders = resp.data;
            });
          },
          updateFolder: function(folder) {
            var $__0 = this;
            console.log("Mail.updateFolder: folder: " + folder + "  " + "neuer name: " + this.neuerNameFolder);
            this.rnFolder(folder, this.neuerNameFolder).then(function(resp) {
              $__0.debugAusgabe = resp.data;
            });
          },
          removeMail: function(mail) {
            var $__0 = this;
            this.mailID = mail._id;
            console.log("Mail.removeMail: " + this.mailID);
            this.delMail(this.mailID).then(function(resp) {
              $__0.debugAusgabe = "remove Mail";
            });
            this.getMails(this.folder).then(function(resp) {
              $__0.mails = resp.data;
            });
          },
          updateMail: function(mail) {
            var $__0 = this;
            console.log(mail);
            console.log("Mail.updateFolder: folder: " + mail._id + "  " + "neuer name: " + this.neuerNameMail);
            this.mvMail(mail._id, this.neuerNameMail).then(function(resp) {
              $__0.debugAusgabe = resp.data;
            });
          },
          setNeuerNameFolder: function(nnamefolder) {
            this.neuerNameFolder = nnamefolder.value;
            console.log("neuer name folder: " + nnamefolder.value);
          },
          sendmail: function(s, e, b, t) {
            var $__0 = this;
            console.log("sender: " + s + " empfänger: " + e + " subject" + b + " text: " + t);
            this.crMail(s, e, b, t).then(function(resp) {
              $__0.debugAusgabe = resp.data;
            });
          },
          setNeuerNameMail: function(nnamemail) {
            this.neuerNameMail = nnamemail.value;
            console.log("neuer name mail: " + nnamemail.value);
          }
        }, {});
      }();
      Object.defineProperty(Mail, "annotations", {get: function() {
          return [new Component({
            selector: 'mail',
            services: [MailApi]
          }), new Template({
            inline: "\n<div>{{debugAusgabe}}</div>\n\n<div *for=\"#folder of folders\">\n    <div class=\"new-user-button\">\n        <button class=\"ru-button --primary\" (click)=\"selectedButton(folder)\" > {{folder}} </button>\n\n        <button (click) = \"removeFolder(folder)\">deleteFolder </button>\n        <input type=\"text\" #nnamefolder (keyup)=\"setNeuerNameFolder(nnamefolder)\"></input>\n        <button (click) =\"updateFolder(folder)\">renameFolder</button>\n\n    </div>\n</div>\n<div *for=\"#mail of mails\">\n    <button class=\"ru-button --primary\" (click)=\"mailOpen(mail)\" >     <strong>Subject: </strong> {{mail.subject}} <strong> Date:</strong> {{mail.date}} </button>\n    <button (click) =\"removeMail(mail)\">DeleteMail</button>\n    <input type=\"text\" #nnamemail (keyup)=\"setNeuerNameMail(nnamemail)\"></input>\n    <button (click) =\"updateMail(mail)\">move2Folder</button>\n    </div>\n    <div> {{myText}} </div>\n    <br><br><br><br><br><br><br>\n\n    <div>sender: <input type=\"text\" #nnsender></input>  <div>\n    <div>empfänger: <input type=\"text\" #nnempfaenger></input>  <div>\n    <div>betreff: <input type=\"text\" #nnbetreff></input>  <div>\n    <div>text: <input type=\"text\" #nntext></input><button (click)=\"sendmail(nnsender.value, nnempfaenger.value,nnbetreff.value, nntext.value)\"> send mail </button><div>\n\n",
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
