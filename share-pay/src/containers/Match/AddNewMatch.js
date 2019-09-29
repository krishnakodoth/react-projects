import React, { Component } from 'react';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { userService } from '../../services/users.services';

class AddNewMatch extends Component {
    constructor(props) {
        super(props);
        const userOpt = [];
        this.props.userList.map((opt)=>{
            userOpt.push({
                id:opt.id,
                value:opt.name
            })
        });
        this.state = {
            matchForm: {
                date: {
                    type: 'date',
                    config: {
                        type: 'text',
                        placeholder: 'Select Date'
                    },
                    label:'Date',                    
                    value: null,
                    validation: {
                       required: true
                    },
                    valid: false,
                    touched: false
                },
                venue: {
                    type: 'input',
                    config: {
                        type: 'text',
                        placeholder: 'Enter Venue'
                    },
                    label:'Venue',                    
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },
                players:
                {
                    type: 'input',
                    config: {
                        type:'checkbox-list',
                        list: userOpt
                    },
                    label:'Choose Players',   
                    value: [],
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },
                amount: {
                    type: 'input',
                    config: {
                        type: 'text',
                        placeholder: 'Enter Amount'
                    },
                    label:'Amount',                    
                    value: '',
                    validation: {
                        required: true,
                        isNumeric:true
                    },
                    valid: false,
                    touched: false
                }
                
            },
            formIsValid:false
        }
    }

    componentDidMount() {
       this.getPlayers();
    }

    getPlayers = () =>{
        userService.getPlayers().then(players => {
            const mapPlayers = [];
            players.data.forEach((row)=>{
                mapPlayers.push({
                    id:row.id,
                    name:row.name
                });
            });

            const updateMatchForm = {...this.state.matchForm };

            const updatedPlayer = { 
                ...updateMatchForm['players']
            };            
            updatedPlayer.config.list = mapPlayers;
            updateMatchForm['players'] = updatedPlayer;

            this.setState({
                matchForm: updateMatchForm
            });
        }).catch(error=>{
            this.setState({
                isAlert:true,
                alertType:'danger',
                alertMessage:error.toString()
            });
        });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.toString().trim() !== '' && isValid;          
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


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedMatchForm = {
            ...this.state.matchForm
        };

        const updatedFormElement = { 
            ...updatedMatchForm[inputIdentifier]
        };

        if(inputIdentifier === 'players'){
            
            if(updatedFormElement.value.includes(event.target.value)){
                let checkedItems = updatedFormElement.value;
                const chkItem = event.target.value;
                const filteredItems = checkedItems.filter((item)=>{
                    return item !== chkItem
                });
                updatedFormElement.value = filteredItems;
            }
            else{
                updatedFormElement.value.push(event.target.value)
            }
        }
        else{ 
            updatedFormElement.value = (inputIdentifier!=='date')?event.target.value:event;
        }

        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        updatedMatchForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (inputIdentifier in updatedMatchForm) {
            formIsValid = updatedMatchForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({matchForm: updatedMatchForm, formIsValid: formIsValid}); 
    }



    submitForm = (event) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        let formElementIdentifier;
        for (formElementIdentifier in this.state.matchForm) {
            let formValue = this.state.matchForm[formElementIdentifier].value;
            if(formElementIdentifier==='date'){
                formValue = formValue.toLocaleDateString();
                // console.log(formValue.toGMTString())
            }
            // console.log(formValue)
            formData[formElementIdentifier] = formValue;
        }
        this.props.onAddNewMatch(formData);
    }
    render() {
        const formElementsArray = [];
        let key;
        for (key in this.state.matchForm) {
            formElementsArray.push({
                id: key,
                config: this.state.matchForm[key]
            });
        }
        let form = (
            <form >
                    <div className="card">
                        <div className="card-body">
                            {
                                formElementsArray.map(formElement =>(<Input
                                        key={formElement.id}
                                        inputKey={formElement.id}
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
                title="Add New Match"
                onDismiss={this.props.dismissModal}
                btnType='submit'
                onSubmit={this.submitForm}
                submitButtonText = {'ADD MATCH'}
                isSubmittable = { (!this.state.formIsValid || this.state.loading ) ? false:true }>
                { form }
            </Modal>
        )

    }
}
export default AddNewMatch;