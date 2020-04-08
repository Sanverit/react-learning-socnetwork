export const IS_LOADING = 'IS_LOADING'

export type SetLoadingStatusType = {
    type: typeof IS_LOADING
    payload: boolean
}

export type LocationType = {
    country: string | null
    city: string | null
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type PostType = {
    post: string
    likesCount: number
    avatar: string
    id: number
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type DataProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}

export type UserType = {
    id: number
    name: string
    uniqueUrlName: string | null
    photos: PhotosType
    status: string | null
    followed: boolean
    location: LocationType
}

export type DialogType = {
    name: string
    id: number
}

export type MessageType = {
    message: string
    id: number
}

export type SetProfileStatusResponseType = {
    data: {}
    resultCode: number
    messages: Array<void>
}

export type FollowUnfollowResponseType = {
    data: {}
    resultCode: number
    messages: Array<void>
}

export type UpdateProfilePhotoResponseType = {
    data: {
        photos: {
            small: string
            large: string
        }
    }
    resultCode: number
    messages: Array<void>
}

export type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
}

export type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
}

export type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: number
    messages: Array<string>
}

export type LogoutResponseType = {
    data: {}
    resultCode: number
    messages: Array<void>
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}
