import React from 'react';
const Modal = (props) => {
    return(
        <div>
            <div className="modal-backdrop fade show"></div>
            
            <div className="modal fade show" id="exampleModal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">
                    {props.title}
                    </h5>
                    <button 
                        type="button" className="close"
                        onClick = { props.onDismiss }>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                   { props.children }
                </div>
                <div className="modal-footer">
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick = { props.onDismiss }>
                        Close
                    </button>
                    <button 
                        type= {`${props.btnType ? props.btnType : 'button'}`}
                        className="btn btn-primary"
                        disabled={ !props.isSubmittable }
                        onClick= { props.onSubmit } >
                        {
                            (props.submitButtonText)?props.submitButtonText:'Save changes'
                        }                        
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        
    )
}
export default Modal;