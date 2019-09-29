import React, { Component } from 'react';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { validate } from '../../utils/form.validation';

class AddNewPlayer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            playerForm: {
                name: {
                    type: 'input',
                    config: {
                        type: 'text',
                        placeholder: 'Enter Name'
                    },
                    label:'Name',                    
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    type: 'input',
                    config: {
                        type: 'email',
                        placeholder: 'Enter email'
                    },
                    label:'Email',                    
                    value: '',
                    validation: {
                        required: true,
                        isEmail:true
                    },
                    valid: false,
                    touched: false
                },
                mobile: {
                    type: 'input',
                    config: {
                        type: 'text',
                        placeholder: 'Enter Mobile Number'
                    },
                    label:'Mobile Number',                    
                    value: '',
                    validation: {
                        required: true,
                        isNumeric:true
                    },
                    valid: false,
                    touched: false
                },
                balance: {
                    type: 'input',
                    config: {
                        type: 'text',
                        placeholder: 'Amount'
                    },
                    label:'Advance Amount',                    
                    value: '',
                    validation: {
                        required: true,
                        isNumeric:true
                    },
                    valid: false,
                    touched: false
                },
                isAdmin: {
                    type: 'select',
                    config: {
                        options:[{id:0,value:'NO'},{id:1,value:'YES'}]
                    },
                    label:'Is Admin',                    
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                }
            },
            formIsValid:false
        }
    }
    /*

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
*/

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedPlayerForm = {
            ...this.state.playerForm
        };

        const updatedFormElement = { 
            ...updatedPlayerForm[inputIdentifier]
        };

        
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = validate.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        updatedPlayerForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (inputIdentifier in updatedPlayerForm) {
            formIsValid = updatedPlayerForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({playerForm: updatedPlayerForm, formIsValid: formIsValid}); 
    }



    submitForm = (event) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        let formElementIdentifier;
        for (formElementIdentifier in this.state.playerForm) {
            formData[formElementIdentifier] = this.state.playerForm[formElementIdentifier].value;
        }
        this.props.onAddNewPlayer(formData);
        // console.log(formData)
    }
    render() {
        const formElementsArray = [];
        let key;
        for (key in this.state.playerForm) {
            formElementsArray.push({
                id: key,
                config: this.state.playerForm[key]
            });
        }
        let form = (
            <form >
                    <div className="card">
                        <div className="card-body">
                            {
                                formElementsArray.map(formElement => (
                                    <Input
                                        inputKey={formElement.id}
                                        key={formElement.id}
                                        type={formElement.config.type}
                                        label={ formElement.config.label}
                                        config={formElement.config.config}
                                        value={formElement.config.value}
                                        invalid={!formElement.config.valid}
                                        shouldValidate={formElement.config.validation}
                                        touched={formElement.config.touched}
                                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                                ))
                            }
                        </div>
                    </div>
                </form>
        );

        if ( this.state.loading ) {
            form = <Spinner />
        }

        return (
            <Modal
                title="Add New Player"
                onDismiss={this.props.dismissModal}
                btnType='submit'
                onSubmit={this.submitForm}
                isSubmittable = { (!this.state.formIsValid || this.state.loading ) ? false:true }>
                { form }
            </Modal>
        )

    }
}
export default AddNewPlayer;