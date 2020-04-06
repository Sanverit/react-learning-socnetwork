export const IS_LOADING = 'IS_LOADING'

export type SetLoadingStatusType = {
    type: typeof IS_LOADING
    payload: boolean
}

export type PhotosType = {
    small: string | null,
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
}

export type UserType = {
    id: number,
    name: string,
    uniqueUrlName: string | null,
    photos: PhotosType
    status: string | null,
    followed: boolean
}