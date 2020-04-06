import React from 'react'
import { connect } from 'react-redux';
import {reduxForm, Field} from 'redux-form'
import { Redirect } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react'

import { Element } from '../Common/FormControls/FormControl'
import { required } from '../../utils/validators/validators'
import { loginThunkCreator } from '../../redux/authReducer'

import s from '../Common/FormControls/FormControl.module.css'


const Input = Element("input");

function LoginForm(props){
    console.log(props)
    return(
           <Form onSubmit={props.handleSubmit}>
            <Form.Field>
                <label>Login</label>
                <Field placeholder='Login' name={"email"} component={Input} validate={[required]}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <Field placeholder='Password' name={"password"} component={Input} validate={[required]} type="password"/>
            </Form.Field>
            <Form.Field>
                <label>Remember Me</label>
                <Field name={"rememberMe"} component={Input} type={"checkbox"}/>
            </Form.Field>
            { props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <Button type='submit'>Submit</Button>
        </Form>
    )
}

function Login(props){
    const onSubmit = (formData) => {
        // console.log('formData', formData) 
        const {email, password,rememberMe} = formData;
        props.loginThunkCreator(email, password,rememberMe)
    }

    if(props.isAuth){
        return <Redirect to={'/profile'} />
    }
    return(
        <>
            <Header as='h2' attached='top'>
                LOGIN
            </Header>
            <Segment attached>
                <LoginReduxForm onSubmit={onSubmit}/>
            </Segment>
        </>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, {loginThunkCreator})(Login)