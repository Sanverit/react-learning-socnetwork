import axios from 'axios'
import {
    MeResponseType,
    LoginResponseType,
    LogoutResponseType,
    DataProfileType,
    SetProfileStatusResponseType,
    UpdateProfilePhotoResponseType,
    GetUsersResponseType,
    FollowUnfollowResponseType,
} from '../types/types'

const baseURL = 'https://social-network.samuraijs.com/api/1.0/'

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'API-KEY': 'd090d0a5-8960-4dc3-a34f-5ab0b639f14e',
    },
})

export const userAPI = {
    async getUsers(currentPage: number, pageSize = 10) {
        const response = await axiosInstance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
        return response.data
    },
    async followUser(userId: number) {
        const response = await axiosInstance.post<FollowUnfollowResponseType>(`follow/${userId}`)
        return response.data.resultCode
    },
    async unfollowUser(userId: number) {
        const response = await axiosInstance.delete<FollowUnfollowResponseType>(`follow/${userId}`)
        return response.data.resultCode
    },
}

export const profileAPI = {
    async getProfile(userId: number) {
        const response = await axiosInstance.get<DataProfileType>(`profile/${userId}`)
        return response.data
    },
    async getProfileStatus(userId: number) {
        const response = await axiosInstance.get<string>(`profile/status/${userId}`)
        return response.data
    },
    async setProfileStatus(statusText: string) {
        const response = await axiosInstance.put<SetProfileStatusResponseType>(`profile/status/`, {
            status: statusText,
        })
        return response.data.resultCode
    },
    async updateProfilePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)
        const response = await axiosInstance.put<UpdateProfilePhotoResponseType>(`profile/photo/`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        })
        return response.data
    },
}

export const authAPI = {
    async me() {
        const response = await axiosInstance.get<MeResponseType>(`auth/me`)
        return response.data
    },
    async login(email: string, password: string, rememberMe = false) {
        const response = await axiosInstance.post<LoginResponseType>(`auth/login`, {
            email,
            password,
            rememberMe,
        })
        return response.data
    },
    async logout() {
        const response = await axiosInstance.delete<LogoutResponseType>(`auth/login`)
        return response.data.resultCode
    },
}
