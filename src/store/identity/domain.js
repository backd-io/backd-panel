export class Domain {

  constructor (backd) {
    this.backd = backd
  }

  List (page = 1, query = '', perPage = 20) {
    var params = {
      'page': page,
      'page_size': perPage
    }
    if (query !== '') {
      params['query'] = query
    }
    return this.backd.getAll('identity', 'domains', params)
  }

}
