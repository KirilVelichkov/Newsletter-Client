'use strict';
const REQUEST_URL = 'http://localhost:1337';

class Requester {
    get(url) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url,
                method: 'GET',
                success(response) {
                    resolve(response);
                }
            });
        });
        return promise;
    }

    putJSON(url, body, options = {}) {

        //send request token
        let token = window.localStorage.getItem('jwt-token');

        let promise = new Promise((resolve, reject) => {
            var headers = options.headers || {};
            headers.authrorization = token;
            $.ajax({
                url: REQUEST_URL + url,
                headers,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    postJSON(url, body, options = {}) {

        //send token to the server
        let token = window.localStorage.getItem('jwt-token');
        
        let promise = new Promise((resolve, reject) => {
            let headers = options.headers || {};
            headers.authrorization = token;

            $.ajax({
                url: REQUEST_URL + url,
                type: 'POST',
                data: JSON.stringify(body),
                async: true,
                cache: false,
                processData: false,
                headers: {
                    'authorization': token
                },
                contentType: 'application/json',
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    postWithFile(url, data) {
        let token = window.localStorage.getItem('jwt-token');

        return new Promise((resolve, reject) => {
            $.ajax({
                url: REQUEST_URL + url,
                type: 'POST',
                data,
                headers: {
                    'authorization': token
                },
                async: true,
                cache: false,
                processData: false,
                contentType: false,
                enctype: 'multipart/form-data',
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });
    }

    putWithFile(url, data) {
        let token = window.localStorage.getItem('jwt-token');

        return new Promise((resolve, reject) => {
            $.ajax({
                url: REQUEST_URL + url,
                headers: {
                    'authorization': token
                },
                type: 'PUT',
                data,
                async: true,
                cache: false,
                contentType: false,
                enctype: 'multipart/form-data',
                processData: false,
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });
    }

    getJSON(url) {
        let token = window.localStorage.getItem('jwt-token');

        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url: REQUEST_URL + url,
                headers: {
                    'Authorization': token
                },
                method: 'GET',
                contentType: 'application/json',
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });
        return promise;
    }
}