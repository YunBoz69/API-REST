import { deleteAddressRequest, addNewAddress, editAddressRequest, checkUsernameAvailability, addNewUser, editUserRequest, deleteUserRequest } from '../helper/APIUtils';
import {ACCESS_TOKEN} from "../../constants";

// CRUD functions for user //

export function addUser () {
    if(this.state.newUserData.username.length <= 5 || this.state.newUserData.password.length <= 5) {
        alert("Username and Password must have at least 5 characters. Please try again !")
        this.toogleNewUserModal();
        return
    }
    checkUsernameAvailability(this.state.newUserData.username)
    .then(response => {
        if (response) {
            addNewUser(this.state.newUserData)
                .then(response => {
                    alert("User added successfully !");
                    this.toogleNewUserModal();
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                }).catch(error => {
                alert(error.message || 'Sorry! Something went wrong. Please try again !');
            });

            this.setState({
                newUserData: {
                    username: '',
                    password: ''
                }
            });
        } else {
            alert("Username already exists! Please try another.");
            this.toogleNewUserModal();
            return;
        }
    });
}

export function updateUser() {
    if(this.state.editUserData.password.length <= 5  || this.state.editUserData.username.length <= 5) {
        alert("Username and password must have at least 5 characters. Please try again !");
        this.toogleEditUserModal();
        return
    }
    editUserRequest(this.state.editUserData)
    .then(response => {
        console.log(this.state.editUserData)
        alert("User updated  successfully !");
        this.toogleEditUserModal();
        this.setState( { editUserData : {
            id: '',
            username: '',
            password: '',
            role: ''
        }});
        setTimeout(function() { window.location.reload(); }, 1000);
    }).catch(error => {
        alert("User not edited. You can't edit other users unless you are ADMIN !");
        this.toogleEditUserModal();
    });
}

export function deleteUser(id) {
    deleteUserRequest(id)
    .then(response => {
        console.log(response);
        localStorage.removeItem(ACCESS_TOKEN);
        alert("User deleted successfully !");
        setTimeout(function() { window.location.reload(); }, 1000);
    }).catch(error => {
       alert("You can't delete other users unless you are ADMIN !");
    });
}

export function editUser(id, username, password, role) {
    this.setState({
        editUserData: {id, username, password, role},
        editUserModal: ! this.state.editUserModal
    });
}

export function parseUserAddresses(addresses, username) {
    this.setState({
        userAddressesData: addresses,
        currentUsername: username,
        userAddressesModal: ! this.state.userAddressesModal
    });
}

// CRUD functions for address //

export function deleteAddress(id) {

    deleteAddressRequest(id)
    .then(response => {
        alert("Address deleted successfully");
        setTimeout(function() { window.location.reload(); }, 1000);
    }).catch(error => {
        alert('Sorry! Something went wrong. Please try again!');
    });
}

export function editAddress(id, rue, city, postalCode, country) {
    this.setState({
        editAddressData: {id, rue, city, postalCode, country},
        editAddressModal: ! this.state.editAddressModal
    });
}

export function addAddress () {
    if(this.state.newAddressData.rue === '' || this.state.newAddressData.city === '' || this.state.newAddressData.postalCode === '' || this.state.newAddressData.country === '') {
        alert("Fields can't be empty. Try again !");
        this.toogleNewAddressModal();
        return
    }

    addNewAddress(this.state.newAddressData)
    .then(response => {
        alert("Address added  successfully !");
        this.toogleNewAddressModal();
        setTimeout(function() { window.location.reload(); }, 1000);
    }).catch(error => {
        alert('Sorry! Something went wrong. Please try again !');
    });

    this.setState( { newAddressData : {
        rue: '',
        city: '',
        postalCode: '',
        country: ''
    }});
}

export function updateAddress() {
    if(this.state.editAddressData.rue === '' || this.state.editAddressData.city === '' || this.state.editAddressData.postalCode === '' || this.state.editAddressData.country === '') {

        alert("Fields can't be empty. Try again !");
        this.toogleEditAddressModal();
        return
    }

    editAddressRequest(this.state.editAddressData)
    .then(response => {
        alert("Address updated  successfully !");
        this.toogleEditAddressModal();
        this.setState( { editAddressData : {
            id: '',
            rue: '',
            city: '',
            postalCode: '',
            country: ''
        }});
        setTimeout(function() { window.location.reload(); }, 1000);
    }).catch(error => {
        alert('Sorry! Something went wrong. Please try again!');
    });
}
