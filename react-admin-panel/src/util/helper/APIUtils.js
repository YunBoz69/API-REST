import { API_BASE_URL, ACCESS_TOKEN } from '../../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

// API functions for register and authenticate //

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/me",
        method: 'GET'
    });
}

export function getAllUsers() {

    return request({
        url: API_BASE_URL + "/user" ,
        method: 'GET'
    });
}

export function login(loginRequest) {
    if(loginRequest.ACCESS_TOKEN) {
        localStorage.removeItem(ACCESS_TOKEN);
    }
    return request({
        url: API_BASE_URL + "/authenticate",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/register",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}


// API functions for address //

export function addNewAddress(newAddressRequest) {
    return request({
        url: API_BASE_URL + "/address",
        method: 'POST',
        body: JSON.stringify(newAddressRequest)
    });
}

export function editAddressRequest(editedAddressRequest) {
    return request({
        url: API_BASE_URL + "/address/" + editedAddressRequest.id,
        method: 'PUT',
        body: JSON.stringify(editedAddressRequest)
    });
}

export function deleteAddressRequest(id) {
    return request({
        url: API_BASE_URL + "/address/" + id,
        method: 'DELETE',
    });
}


// API functions for user //

export function addNewUser(newUserRequest) {
    return request({
        url: API_BASE_URL + "/register",
        method: 'POST',
        body: JSON.stringify(newUserRequest)
    });
}

export function editUserRequest(editedUserRequest) {
    return request({
        url: API_BASE_URL + "/user",
        method: 'PUT',
        body: JSON.stringify(editedUserRequest)
    });
}

export function deleteUserRequest(id) {
    return request({
        url: API_BASE_URL + "/user/" + id,
        method: 'DELETE',
    });
}
