import React from 'react'
import { Input } from 'semantic-ui-react'

function Status(props){
    const {status, newStatusText, editMode, openEditStatus, closeEditStatus, updateNewStatusText} = props;

    const onStatusChange = (e) => {
        let newStatus = e.target.value;
        updateNewStatusText(newStatus);
    }

    return (
        <>
            { !editMode && 
                <div onDoubleClick={openEditStatus}>
                    <span>{status || 'status'}</span>    
                </div>
            }
            { editMode && 
                <div>
                    <Input 
                        autoFocus={true} 
                        onBlur={closeEditStatus} 
                        value={newStatusText || ''} 
                        loading={false} 
                        placeholder={status || "status"} 
                        onChange={onStatusChange}
                    />
                </div>
            }
        </>
    )
}

export default Status;