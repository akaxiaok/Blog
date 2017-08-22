/**
 * Created by Kimi on 2017/7/3.
 */
const fetch = require('isomorphic-fetch');
const getStatusFromGitHub = new Promise((resolve, reject) => {
  fetch('https://api.github.com/users/akax1iaok').then((response) => {
    if (response.status < 400) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }).then(json=>{
    resolve(json);
  }).catch(err=>{
    reject(err);
  });
});

getStatusFromGitHub.then(res => {
  console.log('my name is ' + res.name);
}).catch(err => {
  console.log(err);
});

