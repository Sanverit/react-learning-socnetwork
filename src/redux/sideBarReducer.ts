type FriendType = {
    name: string
    avaFriend: string
    id: number
}
const initialState = {
    friends: [
        {
            name: 'friend1',
            avaFriend: 'https://image.flaticon.com/icons/png/512/186/premium/186313.png',
            id: 1,
        },
        {
            name: 'friend2',
            avaFriend: 'https://image.flaticon.com/icons/png/512/186/premium/186313.png',
            id: 2,
        },
        {
            name: 'friend3',
            avaFriend: 'https://image.flaticon.com/icons/png/512/186/premium/186313.png',
            id: 3,
        },
    ] as Array<FriendType>,
}

const sideBarReducer = (state = initialState) => {
    return state
}

export default sideBarReducer
