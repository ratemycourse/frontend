export const fetchStatic = (staticFile) => {
  return fetch(`http://localhost:3000/${ staticFile }`)
      .then((response) => {
        return (response.text());
      })
      .then((data) => {
        return (data);
      });
};

export const fetchFromAPI = (url, resType = 'text') => {
  return fetch(`http://localhost:3000/${ url }`)
    .then((response) => {
      if (resType === 'json') {
        return response.json();
      }
      return response.text();
    })
    .then((data) => {
      if (resType === 'json') {
        return JSON.parse(data);
      }
      return data;
    });
};

export const postToAPI = (url, payload) => {
  return fetch(`http://localhost:3000/${ url }`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      return JSON.parse(response);
    });
};
