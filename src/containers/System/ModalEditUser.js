import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';


class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: ''
        };
    }

    componentDidMount() {
        this.loadEditUser();
    }

    loadEditUser = async () => {
        let user = this.props.currentUser;
        console.log('modal edit user: ', user);
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: '123abc',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.adress,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                roleId: user.roleId
            })
        }
    }
    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnchangeInput = (event, id) => {
        //good code
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }, () => {
            console.log('check bad state:', this.state);
        })

        console.log('event: ', event.target.value, id);
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'roleId'];
        for (let i = 0; i < arrInput.length; i++) {
            console.log(this.state[arrInput[i]], arrInput[i]);
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter: " + arrInput[i]);
                break;
            }

        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            //call api 
            //console.log('check child props: ', this.props);
            this.props.editUser(this.state);
            // console.log('check this props: ', this.props);

        }
        //console.log('Data: ', this.state);
    }


    render() {
        // console.log('check child props from parent: ', this.props);
        // console.log('check child open modal', this.props.isOpen);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()} closeButton>
                    EDIT INFORMATION USER
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email: </label>
                            <input type='text' className='' placeholder='ABC@gmail.com'
                                onChange={(event) => { this.handleOnchangeInput(event, "email") }}
                                value={this.state.email}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password: </label>
                            <input type='password' className=''
                                onChange={(event) => { this.handleOnchangeInput(event, "password") }}
                                value={this.state.password}
                            />
                        </div>
                        <div className='input-container'>
                            <label>FirstName: </label>
                            <input type='text' className='' placeholder='Firstname' onChange={
                                (event) => { this.handleOnchangeInput(event, "firstName") }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>LastName: </label>
                            <input type='text' className='' placeholder='Lastname' onChange={
                                (event) => { this.handleOnchangeInput(event, "lastName") }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address: </label>
                            <input type='text' className='' placeholder='123 Ho Tung Mau'
                                onChange={(event) => { this.handleOnchangeInput(event, "address") }}
                                value={this.state.address}
                            />
                        </div>

                        <div className='input-container phone-sex-role'>
                            <label>Phone: </label>
                            <input type='text' className='' placeholder='0915xxxx' onChange={
                                (event) => { this.handleOnchangeInput(event, "phoneNumber") }}
                                value={this.state.phoneNumber}
                            />
                        </div>
                        <div className='input-container phone-sex-role'>
                            <label>Sex: </label>
                            <select id='gender' className=''
                                onChange={(event) => { this.handleOnchangeInput(event, "gender") }}
                                value={this.state.gender}
                                defaultValue={'DEFAULT'}
                            >
                                <option value="DEFAULT">-----</option>
                                <option value="0">Nam</option>
                                <option value="1">Nữ</option>
                            </select>
                        </div>
                        <div className='input-container phone-sex-role'>
                            <label>Role: </label>
                            <select id='roleId' className='' onChange={
                                (event) => { this.handleOnchangeInput(event, "roleId") }}
                                value={this.state.roleId}
                                defaultValue={'DEFAULT'}
                            >
                                <option value="DEFAULT">-----</option>
                                <option value="R1">Admin</option>
                                <option value="R2">Doctor</option>
                                <option value="R3">Patient</option>
                            </select>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" className='px-3' onClick={() => this.handleSaveUser()}>
                        Save User
                    </Button>
                    <Button variant="secondary" className='px-3' onClick={() => this.toggle()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

