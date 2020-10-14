import React, { Component } from 'react';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Badge }  from 'reactstrap';
import { deleteAddress, addAddress, updateAddress } from '../../util/crud/CrudUtils';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";

class Address extends Component {
    state = {
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
        newAddressModal: false,
        editAddressModal:false,
    }

    toogleNewAddressModal() {
        this.setState({
            newAddressModal: ! this.state.newAddressModal
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
        return (
                <div>
                    <Button outline id="newAddressButton" variant='contained' color="primary" onClick={this.toogleNewAddressModal.bind(this)}>Ajouter une adresse</Button>
                    <br/>
                    <Modal isOpen={this.state.newAddressModal} toggle={this.toogleNewAddressModal.bind(this)} >
                        <ModalHeader toggle={this.toogleNewAddressModal.bind(this)}>Ajouter une adresse :</ModalHeader>
                        <ModalBody>
                        <FormGroup>
                                <Label for="rue">Rue :</Label>
                                <Input id="rue" value={this.state.newAddressData.rue} onChange={(e) => {
                                    let { newAddressData } = this.state;
                                    newAddressData.rue = e.target.value;
                                    this.setState({ newAddressData });
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="city">Ville :</Label>
                                <Input id="city" value={this.state.newAddressData.city} onChange={(e) => {
                                    let { newAddressData } = this.state;
                                    newAddressData.city = e.target.value;
                                    this.setState({ newAddressData });
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="postalCode">Postal Code :</Label>
                                <Input id="postalCode" value={this.state.newAddressData.postalCode} onChange={(e) => {
                                    let { newAddressData } = this.state;
                                    newAddressData.postalCode = e.target.value;
                                    this.setState({ newAddressData });
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="country">Pays :</Label>
                                <Input id="country" value={this.state.newAddressData.country} onChange={(e) => {
                                    let { newAddressData } = this.state;
                                    newAddressData.country = e.target.value;
                                    this.setState({ newAddressData });
                                }} />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                        <Button id="addAddress" varicolor="primary" onClick={addAddress.bind(this)}>Ajouter</Button>{' '}
                        <Button id="cancelButton" color="secondary" onClick={this.toogleNewAddressModal.bind(this)}>Annuler</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.editAddressModal} toggle={this.toogleEditAddressModal.bind(this)} >
                        <ModalHeader toggle={this.toogleEditAddressModal.bind(this)}>Edit address :</ModalHeader>
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
                            <Button outline id="editButton" color="primary" onClick={updateAddress.bind(this)}>Modifier</Button>{' '}
                            <Button outline id="cancelButton" color="secondary" onClick={this.toogleEditAddressModal.bind(this)}>Annuler</Button>
                        </ModalFooter>
                    </Modal>
                    <br/><br/>

                    <Container fixed>
                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '4vh'}}><h1>Liste des adresses associées </h1></div>                        <br/>
                        <br/>
                        <br/>
                        <blockquote className="blockquote mb-0">
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
                                        {this.props.addresses.map(adresse => (
                                            <TableRow key={adresse.id}>
                                                <TableCell component="th" scope="row">
                                                    <Badge pill>{adresse.id}</Badge>
                                                </TableCell>
                                                <TableCell>{adresse.rue}</TableCell>
                                                <TableCell>{adresse.city}</TableCell>
                                                <TableCell>{adresse.postalCode}</TableCell>
                                                <TableCell>{adresse.country}</TableCell>
                                                <TableCell>
                                                    <Button outline id="editAddress" color="warning" className="mr-2" size="sm"
                                                            onClick={this.editAddress.bind(this, adresse.id, adresse.rue, adresse.city, adresse.postalCode, adresse.country)} >Modifier</Button>
                                                    <Button outline id="deleteAddress" color="danger" size="sm" onClick={deleteAddress.bind(this, adresse.id)}>Supprimer</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </blockquote>
                    </Container>
                </div>
        );
    }
}

export default Address;
