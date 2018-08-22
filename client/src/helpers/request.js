const Request = function (url) {
  this.url = url;
};

Request.prototype.getForAPI = function (headers) {
  return fetch(this.url, {
    headers: headers
  })
    .then((response) => response.json());
};

Request.prototype.get = function (gameID) {
  return fetch(`${this.url}/${gameID}`, {
    method: 'GET'
  })
    .then((response) => response.json());
};

Request.prototype.post = function (payload) {
  return fetch(this.url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json());
};

Request.prototype.delete = function (id) {
  return fetch(`${this.url}/${id}`, {
    method: 'DELETE'
  })
    .then((response) => response.json());
};

Request.prototype.update = function (id, payload) {
  return fetch(`${this.url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  })
  .then((response) => response);
}

module.exports = Request;
