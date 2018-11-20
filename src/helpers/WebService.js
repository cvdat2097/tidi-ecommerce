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

    // 1.1
    Login: (username, password) => {
        return fetch({
            method: 'GET',
            reqBody: {
                username,
                password
            }
        });
    },

    // 1.2
    Register: (username, password, email, fullName, dateOfBirth, phone, gender, address, avatar) => {
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

    // 1.6
    ReadAccountInfo: (token) => {
        return fetch({
            method: 'GET',
            reqBody: {
                token
            }
        });
    },


};
