import ws from './WebService';


export default {
    login: (username, password) => {
        return new Promise((resolve, reject) => {
            ws.login(username, password)
                .then(res => {
                    let auth = JSON.parse(res);

                    if (auth.status.status === 'TRUE' && auth.token && auth.permission) {
                        localStorage.setItem('authToken', auth.token);
                        localStorage.setItem('role', auth.permission);
                        resolve(true);
                    }

                    resolve(false);
                })
                .catch(err => {
                    console.log('ERR AuthSerivce: ' + err);
                });
        });
    },

    logout: () => {
        localStorage.removeItem('authToken');
    },

    isLoggedIn: () => {
        const authToken = localStorage.getItem('authToken');
        return new Promise((resolve, reject) => {
            if (!authToken) {
                resolve({
                    tokenIsValid: false
                });
            } else {
                ws.readAccountInfo(authToken).then(res => {
                    let resObj = JSON.parse(res);
                    if (resObj.status.status !== 'TRUE') {
                        resolve({
                            tokenIsValid: false
                        });
                    } else {
                        resolve({
                            tokenIsValid: true,
                            username: resObj.username,
                            permission: resObj.permission,
                        });
                    }
                });
            }
        });
    },

    saveToken: (token) => {
        localStorage.setItem('authToken', token);
    }
}
