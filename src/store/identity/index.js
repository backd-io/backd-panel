import { Auth } from './auth'
import { Domain } from './domain'

export class Identity {

  constructor (backd) {
    this.backd = backd
  }

  Auth () {
    return new Auth(this.backd)
  }

  Domain () {
    return new Domain(this.backd)
  }

}

// import { Backd } from './backd'
// import { Request } from './requests'
//
// export class Identity {
//   constructor (options) {
//     this.options = options
//
//     this.urls = {
//       'domains': '/domains',
//       'groups': '/groups',
//       'users': '/users',
//       'sessions': '/sessions'
//     }
//   }
//
//   BasicAuth (domain, username, password) {
//     var req = new Request('identity', '/session')
//     req.make('post',
//       req.url(),
//       null,
//       {},
//       {
//         'X-API-Domain': domain,
//         'X-API-User': username,
//         'X-API-Password': password
//       }
//     )
//     .then(function (response) {
//       Backd.security['token'] = response['data']['token']
//       Backd.security['refresh_token'] = response['data']['refresh_token']
//     })
//   }
// }
