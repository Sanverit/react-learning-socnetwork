const SEND_MESSAGE = 'SEND-MESSAGE'

type InitialStateType = typeof initialState;
type DialogType = {
    name: string
    id: number
}
type MessageType = {
    message: string
    id: number
}
const initialState = {
    dataDialogs: [
        {name: "user1", id: 1},
        {name: "user2", id: 2},
        {name: "user3", id: 3}
    ] as Array<DialogType>,
    dataMessages: [
        {message: "hi",     id: 1},
        {message: "hello",  id: 2},
        {message: "by",     id: 3}
    ]as Array<MessageType>
}

const dialogsReducer = (state = initialState, action:any):InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                message: action.payload,
                id: state.dataMessages.length+1,
            };
            return {
                ...state,
                dataMessages: [...state.dataMessages, newMessage]
            };

        default:
            return state;
    }
    
}

type SendMessageCreatorType = {
    type: typeof SEND_MESSAGE, 
    payload: string
}
export const sendMessageCreator = (dialogsMessage:string):SendMessageCreatorType => ({ type: SEND_MESSAGE, payload: dialogsMessage })

export default dialogsReducer;