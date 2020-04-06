const SEND_MESSAGE = 'SEND-MESSAGE'

const initialState = {
    dataDialogs: [
        {
            name: "user1",
            id: 1
        },
        {
            name: "user2",
            id: 2
        },
        {
            name: "user3",
            id: 3
        }
    ],
    dataMessages: [
        {
            message: "hi",
            id: 1
        },
        {
            message: "hello",
            id: 2
        },
        {
            message: "by",
            id: 3
        }
    ],
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                message: action.payload,
                id: state.dataMessages.length+1
            };
            return {
                ...state,
                dataMessages: [...state.dataMessages, newMessage],
            };

        default:
            return state;
    }
    
}

export const sendMessageCreator = (dialogsMessage) => ({ type: SEND_MESSAGE, payload: dialogsMessage })

export default dialogsReducer;