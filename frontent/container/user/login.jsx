import React, { Component } from 'react'

import {
	Link
} from 'react-router'

import {
	createStore
} from 'redux'

import {
	connect
} from 'react-redux'


//引入action类型常量名
import {
	LOGIN
} from '../../constants'


//引入Action创建函数
import {ActionPost} from '../../actions/actions'

import Logo from '../../images/photo.jpg';

class LoginUI extends Component {
	render() {

		const {logo, logoname, logined, renew_csrf_token, version, error, message, onSubmit, onKeyPress} = this.props

		//重载以获取新的csrf_token
		if(renew_csrf_token === 1) {
			window.location.reload(true)
		}

		let emailInput, passwordInput
		return (
			<div className="container">
                <div className="login">
                    <div className="logo">
                        <span><img src={Logo} alt={logoname} /></span>
						<div><b>Alvin's</b> Blog</div>
                    </div>
                    {
                        (error === 0 || error === 1) ? (
                            null
                        ) : (
                            <p className="error-message">{message}</p>
                        )
                    }
                    <label><input onKeyPress={(e)=>onKeyPress(e,emailInput.value, passwordInput.value)} defaultValue="alvinhtml@gmail.com" type="text" placeholder="Username" name="adminname" ref={n=>emailInput=n} /></label>
                    <label><input onKeyPress={(e)=>onKeyPress(e,emailInput.value, passwordInput.value)} defaultValue="123456" type="password" placeholder="Password" name="adminpassword" ref={n=>passwordInput=n} /></label>
                    <button className="login-submit" onClick={(e)=>onSubmit(emailInput.value, passwordInput.value)}>登录</button>
                    <p className="version">软件版本：{version}</p>
                </div>
            </div>
		)
	}
}

export const Login = connect(
	(state) => {
		return state.common
	},
	(dispatch, ownProps) => {
		return {
			onSubmit: (email, password) => {
				dispatch(ActionPost(LOGIN, '/api/admin/login' ,{email, password}, 'common'))
			},
			onKeyPress: (event, email, password) => {
				if(event.charCode === 13){
					dispatch(ActionPost(LOGIN, '/api/admin/login' ,{email, password}, 'common'))
				}
			}
		};
	}
)(LoginUI)
