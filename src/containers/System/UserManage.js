import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import { getAllUser } from '../../services/userService';



class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
        };
    }

    async componentDidMount() {
        let response = await getAllUser('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            }, () => {
                console.log('check user :', this.state.arrUsers);
            });
            console.log('check user 1:', this.state.arrUsers);
        }
        //console.log('get users from node js:', response);
    }
    //** Life Circle
    //* Run component:
    //*1. Run construction--> init state
    //*2. Did mount
    //*3. Render

    render() {
        console.log('check render', this.state);
        return (
            <div className="user-container">
                <div className="title">Table with React</div>
                <div className='user-table mt-4 mx-3'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                        {this.state.arrUsers && this.state.arrUsers.map((item, index) => {
                            console.log('check map item table', item, index);
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.adress}</td>
                                    <td>
                                        <button className='btn-edit'><i className="far fa-edit"></i></button>
                                        <button className='btn-delete'><i className='far fa-trash-alt'></i></button>
                                    </td>
                                </tr>
                            )
                        })}

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
