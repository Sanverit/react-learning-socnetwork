import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import sideBarReducer from './sideBarReducer'

let store = {
    _state : {
        profilePage: {
            dataPosts: [
                {
                    post: "Post1",
                    likesCount: 3,
                    avatar: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
                    id: 1
                },
                {
                    post: "Post2",
                    likesCount: 2,
                    avatar: "https://image.flaticon.com/icons/png/512/186/premium/186313.png",
                    id: 2
                },
                {
                    post: "Post3",
                    likesCount: 4,
                    avatar: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
                    id: 3
                },
            ],
            newPostText: 'new post text!'
        },
        messagesPage: {
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
            newMessageBody: "new message"
        },
        sideBar: {
            friends: [
                {
                    name: "friend1",
                    avaFriend: "https://image.flaticon.com/icons/png/512/186/premium/186313.png",
                    id: 1
                },
                {
                    name: "friend2",
                    avaFriend: "https://image.flaticon.com/icons/png/512/186/premium/186313.png",
                    id: 2
                },
                {
                    name: "friend3",
                    avaFriend: "https://image.flaticon.com/icons/png/512/186/premium/186313.png",
                    id: 3
                }
            ]
        }
        
    },

    _callSubscriber() {
        console.log('state', this._state);
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        this._state.sideBar = sideBarReducer(this._state.sideBar, action);

        this._callSubscriber(this._state);
    }

}

window.store = store;

export default store;