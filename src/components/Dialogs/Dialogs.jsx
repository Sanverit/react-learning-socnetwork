import React from 'react'
import { Redirect } from 'react-router-dom'
import {reduxForm, Field} from 'redux-form'

import Dialog from './Dialog/Dialog'
import Message from './Message/Message'
import { Element } from '../Common/FormControls/FormControl'
import {required, maxLengthCreator} from '../../utils/validators/validators'

import { Form, Button } from 'semantic-ui-react'
import s from './Dialogs.module.css'

const maxLength50 = maxLengthCreator(50);
const Textaria = Element("textarea");

function DialogsForm(props){
    return(
        <Form reply onSubmit={props.handleSubmit}>
            <Field 
                placeholder='Tell us more' 
                name={"dialogMessage"} 
                component={Textaria}
                validate={[required, maxLength50 ]}
            />
            <Button type='submit'>Add Message</Button>
        </Form>
    )
}

function  Dialogs(props){

    const {dialogs, auth, sendMessageAction} = props;

    if(!auth) return <Redirect to={"/login"} />

    const onSubmit = (formData) => {
        sendMessageAction(formData.dialogMessage);
    }

    return(
        <div>
            <div className={s.dialogs}>
                <div className={s.dialogItems}>
                    {dialogs.dataDialogs.map( item => <Dialog key={item.id} userName={item.name} id={item.id}/>) }
                </div>
                <div className={s.messages}>
                    <div>
                        {dialogs.dataMessages.map( item => <Message key={item.id} text={item.message} />) }
                    </div>
                </div>
            </div>
            <div>
                <DialogsReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

const DialogsReduxForm = reduxForm({
    form: 'dialogs'
})(DialogsForm)

export default Dialogs;