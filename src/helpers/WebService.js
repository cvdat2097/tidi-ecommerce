import Request from 'request';
import COSNTANT from '../config/constants';

const fetch = ({ method, reqBody }) => {
    return new Promise((resolve, reject) => {
        Request({
            method,
            uri: COSNTANT.REST_SERVER,
            qs: (method === 'GET' ? reqBody : undefined),
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
            method: 'GET',
            reqBody: {
                username,
                password
            }
        });
    },

    // 1.2 Registration
    register: (username, password, email, fullName, dateOfBirth, phone, gender, address, avatar) => {
        return fetch({
            method: 'GET',
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
            }
        });
    },

    // 1.3 Registration email verification
    verifyEmail(verificationCode) {
        return fetch({
            method: 'GET',
            reqBody: {
                verificationCode
            }
        });
    },

    // 1.4 Reset password
    resetPassword(username) {
        return fetch({
            method: 'GET',
            reqBody: {
                username
            }
        });
    },

    // 1.5 Reset password email verification 
    verifyEmailResetPassword(verificationCode) {
        return fetch({
            method: 'GET',
            reqBody: {
                verificationCode
            }
        });
    },

    // 1.6 READ Account information
    readAccountInfo: (token) => {
        return fetch({
            method: 'GET',
            reqBody: {
                token
            }
        });
    },

    // 1.7 UPDATE Account information 
    updateAccountInfo: (token, { dateOfBirth, address, avatar }) => {
        return fetch({
            method: 'GET',
            reqBody: {
                token,
                newInfo: {
                    dateOfBirth,
                    address,
                    avatar
                }
            }
        });
    },

    // 1.8 UPDATE Account password 
    updateAccountPassword: (verificationCode, newPassword, { username, email }) => {
        let body = {}
        if (username) {
            body.username = username;
        } else {
            body.email = email;
        }

        return fetch({
            method: 'GET',
            reqBody: {
                verificationCode,
                newPassword,
                ...body,
            }
        });
    },

    // 1.9 UPDATE password
    updatePassword: (token, password, newPassword) => {
        return fetch({
            method: 'GET',
            reqBody: {
                token,
                password,
                newPassword
            }
        });
    },
};
