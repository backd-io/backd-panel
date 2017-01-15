import { Identity } from './identity/index'
let axios = require('axios')

export class Backd {

  // var options = {
  //   urls: {
  //     identity: '',
  //     objects: ''
  //   },
  //   domain: '',
  //   app: ''
  // };

  constructor (options) {
    this.options = options

    this.security = {
      'token': '',
      'refresh_token': '',
      'domain': options['domain'],
      'username': '',
      'password': ''
    }
  }

  Identity () {
    return new Identity(this)
  }

  /*

    HTTP REQUESTS

  */

  /**
   * Returns the data from the request
   * @param {object} response - Response object
   * @returns {object}        - Data returned on the request
   */
  getData (response) {
    return response['data']
  }

  /**
   * Makes the request to the server
   * @param {string} method  - HTTP method
   * @param {string} url     - URL
   * @param {object} data    - Data to send in the request or null
   * @param {object} params  - Parameters to add to the request
   * @param {object} headers - Headers that needs to be included
   * @returns {object}      - Response object
   */
  make (method, url, data = null, headers = {}, params = {}) {
    return axios({
      method,
      url,
      data,
      headers,
      params
    })
  }

  /**
   * gets an object by its ID
   * @param {string} mod    - Backd Module.
   * @param {string} res    - Resource to query.
   * @param {string} id     - ID of the object to query.
   * @param {object} params - Object with the required parameters to add to the URI.
   * @returns {object}      - Response object
   */
  getOne (mod, res, id, params = {}) {
    return this.make(
      'get',
      this.url(mod, res, id),
      null,
      this.headerAuthorization(),
      params
    ).then(this.getData)
  }

  /**
   * Gets an array of objects at the given request. Params must be supply to modify
   * the search request.
   * @param {string} mod    - Backd Module.
   * @param {string} res    - Resource to query.
   * @param {object} params - Object with the required parameters to add to the URI.
   * @returns {object}      - Response object
   */
  getAll (mod, res, params = {}) {
    return this.make(
      'get',
      this.url(mod, res),
      null,
      this.headerAuthorization(),
      params
    ).then(this.getData)
  }

  /**
   * Creates a new object on the remote endpoint
   * @param {string} mod    - Backd Module.
   * @param {string} res    - Resource to query.
   * @param {object} model  - Model to save on the request.
   * @param {object} params - Object with the required parameters to add to the URI.
   * @returns {object}      - Response object
   */
  create (mod, res, model, params = {}) {
    return this.make(
      'post',
      this.url(mod, res),
      model,
      this.headerAuthorization(),
      params
    )
  }

  /**
   * Updates the selected model on the remote endpoint
   * @param {string} mod    - Backd Module.
   * @param {string} res    - Resource to query.
   * @param {object} model  - Model to save on the request.
   * @param {object} params - Object with the required parameters to add to the URI.
   * @returns {object}      - Response object
   */
  update (mod, res, model, params = {}) {
    return this.make(
      'put',
      this.url(mod, res, model.id),
      model,
      this.headerAuthorization(),
      params
    )
  }

  /**
   * deletes an object by its ID
   * @param {string} mod    - Backd Module.
   * @param {string} res    - Resource to query.
   * @param {string} id     - ID of the object to query.
   * @param {object} params - Object with the required parameters to add to the URI.
   * @returns {object}      - Response object
   */
  delete (mod, res, id, params = {}) {
    return this.make(
      'delete',
      this.url(mod, res, id),
      null,
      this.headerAuthorization(),
      params
    )
  }

  /**
   * returns the required headers to the request based on the current data
   * at the main object
   * @returns {object} - Headers object
   */
  headerAuthorization () {
    if (this.security['token'] !== '') {
      return {
        'Authorization': 'Bearer ' + this.security['token']
      }
    }
    return {
      'X-API-Domain': this.security['domain'],
      'X-API-User': this.security['username'],
      'X-API-Password': this.security['password']
    }
  }

  url (mod, res, ...parts) {
    parts.splice(0, 0, [this.options['urls'][mod], res].join('/'))
    return parts.join('/').toLowerCase()
  }

};
