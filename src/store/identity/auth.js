export class Auth {

  constructor (backd) {
    this.backd = backd
  }

  Basic (domain, username, password) {
    var that = this.backd
    return that.make('post',
      that.url('identity', 'session'),
      null,
      {
        'X-API-Domain': domain,
        'X-API-User': username,
        'X-API-Password': password
      },
      {}
    )
    .then(function (response) {
      that.security['token'] = response['data']['token']
      that.security['refresh_token'] = response['data']['refresh_token']
      that.security['domain'] = domain
      that.security['username'] = username
      that.security['password'] = password
    })
  }

}
