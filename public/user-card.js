System.register("user-card", ["angular2/angular2", "angular2/di"], function($__export) {
  "use strict";
  var __moduleName = "user-card";
  var Component,
      Template,
      For,
      If,
      bind,
      UserCard;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      Template = $__m.Template;
      For = $__m.For;
      If = $__m.If;
    }, function($__m) {
      bind = $__m.bind;
    }],
    execute: function() {
      UserCard = function() {
        function UserCard(moment) {
          this.properties = [{
            title: 'Name',
            getVal: function(user) {
              return (user.name.first + " " + user.name.last);
            }
          }, {
            title: 'Username',
            getVal: function(user) {
              return user.username;
            }
          }, {
            title: 'Email',
            getVal: function(user) {
              return user.email;
            }
          }, {
            title: 'Birthday',
            getVal: function(user) {
              return moment(user.dob * 1000).format('MMMM Do, YYYY');
            }
          }, {
            title: 'Cell Phone Number',
            getVal: function(user) {
              return user.cell;
            }
          }];
        }
        return ($traceurRuntime.createClass)(UserCard, {}, {});
      }();
      $__export("UserCard", UserCard);
      Object.defineProperty(UserCard, "annotations", {get: function() {
          return [new Component({
            selector: 'user-card',
            bind: {
              user: 'user',
              loading: 'loading'
            },
            services: [bind(moment).toValue(moment)]
          }), new Template({
            inline: "\n    <div class=\"user-card\">\n      <div [hidden]=\"!loading\">\n        <content select=\"[loading]\"></content>\n      </div>\n      <div [hidden]=\"loading\">\n        <div [hidden]=\"user\" class=\"no-user\">\n          <content select=\"[no-user]\"></content>\n        </div>\n        <div *if=\"user\">\n          <div class=\"user-avatar-container\">\n            <img [src]=\"user.picture.medium\" alt=\"User Avatar\" />\n          </div>\n\n\n          <div class=\"user-properties\">\n            <div *for=\"#prop of properties\">\n              <strong>{{prop.title}}:</strong> {{prop.getVal(user)}}\n\n\n            </div>\n          </div>\n\n          <div> {{user.name.first}} {{user.name.last}} {{user.email}}</div>\n\n        </div>\n\n\n      </div>\n    </div>\n  ",
            directives: [If, For]
          })];
        }});
      Object.defineProperty(UserCard, "parameters", {get: function() {
          return [[moment]];
        }});
    }
  };
});
