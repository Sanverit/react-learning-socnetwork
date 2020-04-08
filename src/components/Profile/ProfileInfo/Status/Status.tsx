import React, { ChangeEvent } from 'react'
import { Input } from 'semantic-ui-react'

type PropsType = {
    status: string
    newStatusText: string
    editMode: boolean
    openEditStatus: () => void
    closeEditStatus: () => void
    updateNewStatusText: (newStatus:string) => void
}
function Status({status, newStatusText, editMode, openEditStatus, closeEditStatus, updateNewStatusText}:PropsType){

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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