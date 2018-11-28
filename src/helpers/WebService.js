import Request from 'request';
import COSNTANT from '../config/constants';

const apiPrefix = {
    authentication: '/auth',
    account: '/account'
}

const fetch = ({ method, reqBody, route }) => {
    return new Promise((resolve, reject) => {
        Request({
            method,
            uri: COSNTANT.REST_SERVER + route,
            qs: (method === 'POST' ? reqBody : undefined),
            body: (method === 'POST' ? JSON.stringify(reqBody) : undefined)
        }, (err, res, body) => {
            if (err) {
                reject(err);
            }
            resolve(body);
        });
    });
}

export default {
    fetch,

    // 1.1 Login
    login: (username, password) => {
        return fetch({
            method: 'POST',
            reqBody: {
                username,
                password
            },
            route: apiPrefix.authentication + '/login'
        });
    },

    // 1.2 Registration
    register: (username, password, email, fullName, dateOfBirth, phone, gender, address, avatar) => {
        return fetch({
            method: 'POST',
            reqBody: {
                username,
                password,
                email,
                fullName,
                dateOfBirth,
                phone,
                gender,
                address,
                avatar
            },
            route: apiPrefix.authentication + '/register'
        });
    },

    // 1.3 Registration email verification
    verifyEmail(verificationCode) {
        return fetch({
            method: 'POST',
            reqBody: {
                verificationCode
            },
            route: apiPrefix.authentication + '/verifyEmail'
        });
    },

    // 1.4 Reset password
    resetPassword(username) {
        return fetch({
            method: 'POST',
            reqBody: {
                username
            },
            route: apiPrefix.authentication + '/resetPassword'
        });
    },

    // 1.5 Reset password email verification 
    verifyEmailResetPassword(verificationCode) {
        return fetch({
            method: 'POST',
            reqBody: {
                verificationCode
            },
            route: apiPrefix.authentication + '/resetPasswordVerification'
        });
    },

    // 2.1 READ Account information
    readAccountInfo: (token) => {
        return fetch({
            method: 'POST',
            reqBody: {
                token
            },
            route: apiPrefix.account + '/info'
        });
    },

    // 2.2 UPDATE Account information 
    updateAccountInfo: (token, { dateOfBirth, address, avatar }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                token,
                newInfo: {
                    dateOfBirth,
                    address,
                    avatar
                },
                route: apiPrefix.account + '/updateInfo'
            }
        });
    },

    // 2.3 UPDATE Account password 
    updateAccountPassword: (token, password, newPassword) => {
        return fetch({
            method: 'POST',
            reqBody: {
                token,
                password,
                newPassword,
            },
            route: apiPrefix.account + '/updatePassword'
        });
    },
}