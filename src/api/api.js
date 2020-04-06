import * as axios from 'axios'

const baseURL = "https://social-network.samuraijs.com/api/1.0/"

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "API-KEY": "d090d0a5-8960-4dc3-a34f-5ab0b639f14e"
    }
})

export const userAPI = {
    getUsers(currentPage, pageSize=10){
        return axiosInstance.get(
                `users?page=${currentPage}&count=${pageSize}`
            )
            .then( response => {
                return response.data;
            })
    
    },
    followUser(userId){
        return axiosInstance.post( 
                `follow/${userId}`
            )
            .then( response => {
                return response.data.resultCode;
            })
    },
    unfollowUser(userId){
        return axiosInstance.delete( 
                `follow/${userId}`
            )
            .then( response => {
                return response.data.resultCode;
            })
    },
}


export const profileAPI = {
    getProfile(userId){
        return axiosInstance.get(
                `profile/${userId}`
            )
            .then( response => {
                return response.data;
            })
    
    },
    getProfileStatus(userId){
        return axiosInstance.get(
                `profile/status/${userId}`
            )
            .then( response => {
                return response.data;
            })
    
    },
    setProfileStatus(statusText){
        return axiosInstance.put(
                `profile/status/`,
                {
                    status: statusText
                }
            )
            .then( response => {
                return response.data.resultCode;
            })
    
    },
    updateProfilePhoto(photoFile){
        const formData = new FormData();
        formData.append('image', photoFile)
        return axiosInstance.put(
                `profile/photo/`,
                formData,
                {
                    headers: {
                        'Content-type': 'multipart/form-data'
                    }
                }
            )
            .then( response => {
                return response.data;
            })
    
    },
}

export const authAPI = {
    getAuth(){
        return axiosInstance.get(
                `auth/me`
            )
            .then( response => {
                return response.data;
            })
    
    },
    login(email, password, rememberMe=false){
        return axiosInstance.post(
                `auth/login`,
                {
                    email,
                    password,
                    rememberMe,
                }
            )
            .then( response => {
                console.log('login response', response)
                return response.data;
            })
    
    },
    logout(){
        return axiosInstance.delete(
                `auth/login`
            )
            .then( response => {
                console.log('logout response', response)
                return response.data;
            })
    
    }
}