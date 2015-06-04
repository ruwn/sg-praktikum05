import {Component, Template, For, If} from 'angular2/angular2';
import {bind} from 'angular2/di';

@Component({
  selector: 'user-card',
  bind: {
    user: 'user',
    loading: 'loading'
  },
  services: [
    bind(moment).toValue(moment)
  ]
})
@Template({
  inline: `
    <div class="user-card">
      <div [hidden]="!loading">
        <content select="[loading]"></content>
      </div>
      <div [hidden]="loading">
        <div [hidden]="user" class="no-user">
          <content select="[no-user]"></content>
        </div>
        <div *if="user">
          <div class="user-avatar-container">
            <img [src]="user.picture.medium" alt="User Avatar" />
          </div>


          <div class="user-properties">
            <div *for="#prop of properties">
              <strong>{{prop.title}}:</strong> {{prop.getVal(user)}}


            </div>
          </div>

          <div> {{user.name.first}} {{user.name.last}} {{user.email}}</div>

        </div>


      </div>
    </div>
  `,
  directives: [If, For]
})
export class UserCard {
  constructor(moment:moment) {
    this.properties = [
      {
        title: 'Name',
        getVal: user => `${user.name.first} ${user.name.last}`
      },
      {
        title: 'Username',
        getVal: user => user.username
      },
      {
        title: 'Email',
        getVal: user => user.email
      },

      {
        title: 'Birthday',
        getVal: user => moment(user.dob * 1000).format('MMMM Do, YYYY')
      },
      {
        title: 'Cell Phone Number',
        getVal: user => user.cell
      }
    ];


  }
}
