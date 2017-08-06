(() => {
  const server = ``;

  const generateErrorMessage = (reject) => {
    if (!reject) {
      return 'Failed: Server returned no response';
    }
    if(reject.status || reject.statusText) {
      return `Failed: ${reject.status} -- ${reject.statusText}`;
    }
    return `Failed: ${reject}`;
  };

  const fetchService = ({
    url,
    method,
    body
  }) => {
    return fetch( `${server}${url}`, {
      method,
      headers: new Headers({
        'Content-Type': `application/json`,
        'Accept': `application/json`
      }),
      body: body && JSON.stringify(body)
    })
    .then( (response) => {
      if(response.ok) {
        return response.json()
        .then( (json) => { return { ok: true, result: json };} );
      }
      return Promise.reject(response);
    })
    .catch( (reject) => {
      return {
        ok: false,
        error: generateErrorMessage(reject)
      };
    });
  };

  const calls = {
    createUserForApp: ({appkey, username, password}) => {
      return fetchService({
        url: `/user/${appkey}/${username}`,
        method: 'POST',
        body: {  password }
      });
    },

  };

  window.CRUD = {
    calls
  };


})();
