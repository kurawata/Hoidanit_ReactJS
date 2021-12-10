import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleUserLoginAPI } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }
    ////////////Function/////////////////
    handleOnChangeInput = (event) => {
        this.setState({
            username: event.target.value
        })
        //console.log(event.target.value);
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        //console.log(event.target.value);
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            // alert('Clicked !')
            // console.log("username: ", this.state.username, " password: ", this.state.password);
            // console.log("allstate: ", this.state);
            let data = await handleUserLoginAPI(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode == 0) {
                this.props.userLoginSuccess(data.user);
                //console.log('login success');
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
            //console.log('hoidanit', e.response);
            // this.state.setState({
            //     errMessage: e.Response
            // })
        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    ////////////////////////////////////
    render() {
        //JSX

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">LOGIN</div>
                        <div className="form-group login-input">
                            <label>Username:</label>
                            <input type="text" className="form-control" placeholder="Enter your Username"
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeInput(event)}
                            />
                        </div>
                        <div className="form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control" placeholder="Enter your Password"
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }}
                                >
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button className="btn-login"
                                onClick={(event) => { this.handleLogin(event) }}
                            >Login</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-pass">Forgot your password ?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="txt-other-login">Or login with:</span>
                        </div>
                        <div className="col-12 social-login" >
                            <i className="fab fa-facebook-f facebook"></i>
                            <i className="fab fa-google-plus-g google"></i>
                        </div>

                        <div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
