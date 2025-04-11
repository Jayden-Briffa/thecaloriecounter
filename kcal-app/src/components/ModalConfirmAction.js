import React from 'react';
import BtnModalDismiss from './BtnModalDismiss';

function ModalConfirmAction(props) {
  return (
    <div className="modal fade" id="confirmActionModal" tabindex="-1" aria-labelledby="confirmActionModal" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="confirmActionModal">{props.heading ?? "Confirm action"}</h1>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-end gap-3">
              <BtnModalDismiss handleClick={props.handleReject} btnText={props.rejectText ?? "No"} className="flex-grow-1" />
              <BtnModalDismiss handleClick={props.handleConfirm} btnText={props.confirmText ?? "Yes"} className="flex-grow-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmAction;
