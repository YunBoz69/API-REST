import React, {Component} from 'react';
import {
    Badge,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table
} from 'reactstrap';
import {getAllUsers} from '../../util/helper/APIUtils';
import {
    addAddress,
    addUser,
    deleteAddress,
    deleteUser,
    editUser,
    parseUserAddresses, updateAddress,
    updateUser
} from '../../util/crud/CrudUtils';
import 'bootstrap/dist/css/bootstrap.min.css';
import {withRouter} from 'react-router-dom';
import Moment from 'moment';
import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Paper, Button} from "@material-ui/core";

class UsersScreen extends Component {
    state = {
        users: [],
        userAddressesData: [],
        currentUsername: '',
        newUserData: {
            username: '',
            password: ''
        },
        editUserData: {
            id: "",
            username: '',
            password: '',
            role: ''
        },
        newAddressData: {
            rue: '',
            city: '',
            postalCode: '',
            country: ''
        },
        editAddressData: {
            id: "",
            rue: '',
            city: '',
            postalCode: '',
            country: ''
        },
        editAddressModal:false,
        newUserModal: false,
        editUserModal: false,
        userAddressesModal: false,
        newAddressModal: false,
        rows: [],
    };

    toogleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }



    toogleNewUserModal() {
        this.setState({
            newUserModal: ! this.state.newUserModal
        });
    }

    toogleUserAddressesModal() {
        this.setState({
            userAddressesModal: !this.state.userAddressesModal
        });
    }

    toogleNewAddressModal() {
        this.setState({
            newAddressModal: !this.state.newAddressModal
        });
    }

    componentWillMount() {
        getAllUsers().then(response => {
            this.setState({users: response});
        }).catch(error => {
            alert('Sorry! Something went wrong. Please try again !');
        });
    }

    toogleEditAddressModal() {
        this.setState({
            editAddressModal: ! this.state.editAddressModal
        });
    }

    editAddress(id, rue, city, postalCode, country) {
        this.setState({
            editAddressData: {id, rue, city, postalCode, country},
            editAddressModal: ! this.state.editAddressModal
        });
    }

    render() {
        if (!this.state.users) {
            return <div></div>
        }

        return (
            <div>
                <Modal isOpen={this.state.newUserModal} toggle={this.toogleNewUserModal.bind(this)}>
                    <ModalHeader toggle={this.toogleNewUserModal.bind(this)}>Ajouter un utilisateur :</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="username">Username :</Label>
                            <Input id="username" value={this.state.newUserData.rue} onChange={(e) => {
                                let {newUserData} = this.state;
                                newUserData.username = e.target.value;
                                this.setState({newUserData});
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password :</Label>
                            <Input type="password" id="password" value={this.state.newUserData.city} onChange={(e) => {
                                let {newUserData} = this.state;
                                newUserData.password = e.target.value;
                                this.setState({newUserData});
                            }}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="contained" color="primary" onClick={addUser.bind(this)}>Ajouter utilisateur</Button>{' '}
                        <Button variant="contained" color="secondary" onClick={this.toogleNewUserModal.bind(this)}>Annuler</Button>
                    </ModalFooter>
                </Modal>

                <Modal  isOpen={this.state.userAddressesModal}
                       toggle={this.toogleUserAddressesModal.bind(this)}>
                    <ModalHeader toggle={this.toogleUserAddressesModal.bind(this)}>Adresses associées :
                        :{' '}<i>{this.state.currentUsername}</i>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        <Button  variant="contained" onClick={this.toogleNewAddressModal.bind(this)} color="primary">
                            Ajouter une adresse
                        </Button></ModalHeader>
                    <ModalBody>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Rue</TableCell>
                                        <TableCell>Ville</TableCell>
                                        <TableCell>Code Postal</TableCell>
                                        <TableCell>Pays</TableCell>
                                        <TableCell>Actions</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.userAddressesData.map(adresse => (
                                        <TableRow key={adresse.id}>
                                            <TableCell component="th" scope="row">
                                                <Badge pill>{adresse.id}</Badge>
                                            </TableCell>
                                            <TableCell>{adresse.rue}</TableCell>
                                            <TableCell>{adresse.city}</TableCell>
                                            <TableCell>{adresse.postalCode}</TableCell>
                                            <TableCell>{adresse.country}</TableCell>
                                            <TableCell>
                                                <Button  id="editAddress" variant="contained" className="mr-2"
                                                        onClick={this.editAddress.bind(this, adresse.id, adresse.rue, adresse.city, adresse.postalCode, adresse.country)} >Modifier</Button>
                                                <Button  id="deleteAddress" color="secondary" variant="contained"  onClick={deleteAddress.bind(this, adresse.id)}>Supprimer</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </ModalBody>
                    <ModalFooter>
                        <Button  color="secondary"
                                variant="contained"
                                onClick={this.toogleUserAddressesModal.bind(this)}>Fermer</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.editUserModal} toggle={this.toogleEditUserModal.bind(this)}>
                    <ModalHeader toggle={this.toogleEditUserModal.bind(this)}>Modifier</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="username">Nom d'utilisateur :</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>@</InputGroupText>
                                </InputGroupAddon>
                                <Input id="username" value={this.state.editUserData.username} onChange={(e) => {
                                    let {editUserData} = this.state;
                                    editUserData.username = e.target.value;
                                    this.setState({editUserData});
                                }}/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password :</Label>
                            <Input type="password" id="password"
                                   onChange={(e) => {
                                       let {editUserData} = this.state;
                                       editUserData.password = e.target.value;
                                       this.setState({editUserData});
                                   }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="role">Role :</Label>
                            <Input type="select" name="select" id="role" value={this.state.editUserData.role}
                                   onChange={(e) => {
                                       let {editUserData} = this.state;
                                       editUserData.role = e.target.value;
                                       this.setState({editUserData});
                                   }}>
                                <option>ROLE_USER</option>
                                <option>ROLE_ADMIN</option>
                            </Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button  variant="contained" color="primary" onClick={updateUser.bind(this)}>Modifier</Button>{' '}
                        <Button  variant="contained" color="secondary" onClick={this.toogleEditUserModal.bind(this)}>Annuler</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.newAddressModal} toggle={this.toogleNewAddressModal.bind(this)}>
                    <ModalHeader toggle={this.toogleNewAddressModal.bind(this)}>Ajouter une adresse :</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="rue">Rue :</Label>
                            <Input id="rue" value={this.state.newAddressData.rue} onChange={(e) => {
                                let {newAddressData} = this.state;
                                newAddressData.rue = e.target.value;
                                this.setState({newAddressData});
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">Ville :</Label>
                            <Input id="city" value={this.state.newAddressData.city} onChange={(e) => {
                                let {newAddressData} = this.state;
                                newAddressData.city = e.target.value;
                                this.setState({newAddressData});
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="postalCode">Postal Code :</Label>
                            <Input id="postalCode" value={this.state.newAddressData.postalCode} onChange={(e) => {
                                let {newAddressData} = this.state;
                                newAddressData.postalCode = e.target.value;
                                this.setState({newAddressData});
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="country">Pays :</Label>
                            <Input id="country" value={this.state.newAddressData.country} onChange={(e) => {
                                let {newAddressData} = this.state;
                                newAddressData.country = e.target.value;
                                this.setState({newAddressData});
                            }}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button  variant="contained" id="addAddress" color="primary" onClick={addAddress.bind(this)}>Ajouter</Button>{' '}
                        <Button  variant="contained" id="cancelButton" color="secondary"
                                onClick={this.toogleNewAddressModal.bind(this)}>Annuler</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.editAddressModal} toggle={this.toogleEditAddressModal.bind(this)} >
                    <ModalHeader toggle={this.toogleEditAddressModal.bind(this)}>Modifier l'adresse :</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="rue">Rue :</Label>
                            <Input id="rue" value={this.state.editAddressData.rue} onChange={(e) => {
                                let { editAddressData } = this.state;
                                editAddressData.rue = e.target.value;
                                this.setState({ editAddressData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">Ville :</Label>
                            <Input id="city" value={this.state.editAddressData.city} onChange={(e) => {
                                let { editAddressData } = this.state;
                                editAddressData.city = e.target.value;
                                this.setState({ editAddressData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="postalCode">Postal Code :</Label>
                            <Input id="postalCode" value={this.state.editAddressData.postalCode} onChange={(e) => {
                                let { editAddressData } = this.state;
                                editAddressData.postalCode = e.target.value;
                                this.setState({ editAddressData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="country">Pays :</Label>
                            <Input id="country" value={this.state.editAddressData.country} onChange={(e) => {
                                let { editAddressData } = this.state;
                                editAddressData.country = e.target.value;
                                this.setState({ editAddressData });
                            }} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button  id="editButton" variant="contained" color="primary" onClick={updateAddress.bind(this)}>Modifier l'adresse</Button>{' '}
                        <Button  id="cancelButton" variant="contained" color="secondary" onClick={this.toogleEditAddressModal.bind(this)}>Annuler</Button>
                    </ModalFooter>
                </Modal>

                <br/>
                <Container fixed>
                    <Button color="primary" variant="contained" onClick={this.toogleNewUserModal.bind(this)}>Ajouter utilisateur</Button>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '4vh'}}><h1>Liste des utilisateurs</h1></div>                        <br/>
                    <br/>
                    <br/>
                    <br/>
                    <blockquote className="blockquote mb-0">
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Username</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Date de création</TableCell>
                                        <TableCell>Adresse</TableCell>
                                        <TableCell>Actions</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.users.map(user => (
                                        <TableRow key={user.name}>
                                            <TableCell component="th" scope="row">
                                                <Badge pill>{user.id}</Badge>
                                            </TableCell>
                                            <TableCell>{user.username}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell>{Moment(user.creationDate).format('DD MMM YYYY')}</TableCell>
                                            <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={parseUserAddresses.bind(this, user.adresses, user.username)}>Voir</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" className="mr-2"
                                                        onClick={editUser.bind(this, user.id, user.username, '', user.role)}>Modifier</Button>
                                                <Button color="secondary" variant="contained"
                                                        onClick={deleteUser.bind(this, user.id)}>Supprimer</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </blockquote>
                </Container>
                <br/>
            </div>
        );
    }
}

export default withRouter(UsersScreen);
