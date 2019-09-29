import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Input.css'


const Input = (props) => {
    let inputElement = null;
    const inputWraper = ['form-group'];
    const inputClasses = ['form-control'];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputWraper.push('has-error');
    }


    switch (props.type) {
        case ('date'):
            inputElement =
                <DatePicker
                    className={inputClasses.join(' ')}
                    selected={props.value}
                    onChange={props.changed}
                    dateFormat="yyyy-MM-dd"
                    {...props.config}
                />;
            break;
        case ('input'):
            if (props.config.type === 'checkbox-list') {
                let check_list = props.config.list.map((chkItem,index) => {
                    return(
                        <div className="form-check form-check-inline" key={`chk-list-${chkItem.id}`}>
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                name={props.inputKey}
                                value={chkItem.id}
                                onChange={props.changed} 
                                />
                            <label className="form-check-label">{ chkItem.value }</label>
                        </div>
                        
                    )
                });
                
                inputElement = <div className="chk-grouo">{check_list}</div>
                
            }
            else {
                inputElement = <input
                    className={inputClasses.join(' ')}
                    {...props.config}
                    value={props.value}
                    onChange={props.changed} />;
            }

            break;

        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.config}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    multiple = {props.config.multiple}
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                    >
                    {props.config.options.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.value}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={inputWraper.join(' ')}>
            <label className={''}>{props.label}</label>
            {inputElement}
        </div>
    );
}
export default Input;