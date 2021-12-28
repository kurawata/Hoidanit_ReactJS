import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import { getAllUser, createNewUserService } from '../../services/userService';
import ModalUser from './ModalUser';


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        };
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUser('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            });
        }
    }


    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,

        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    createNewUser = async (data) => {
        try {
            //console.log('data from create:', data);
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.message)
            } else {
                alert(response.message);
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })
            }
            // console.log('response create new user: ', response);
        } catch (e) {
            console.log(e);
        }
        // console.log('check data from child: ', data);
    }
    //** Life Circle
    //* Run component:
    //*1. Run construction--> init state
    //*2. Did mount (set state)  : born ; unmount
    //*3. Render

    handleDeleteUser = async (id) => {

    }


    render() {
        //console.log('check render', this.state);
        let arrUser = this.state.arrUsers;
        //console.log(arrUser);
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <div className="title">Table with React</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    ><i className='fas fa-plus'></i> Add new user</button>
                </div>
                <div className='user-table mt-4 mx-3'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {arrUser && arrUser.map((item, index) => {
                                // console.log('check map item table', item, index);
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.adress}</td>
                                        <td>
                                            <button className='btn-edit'><i className="far fa-edit"></i></button>
                                            <button className='btn-delete' onClick={() => handleDeleteUser()}><i className='far fa-trash-alt'></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
