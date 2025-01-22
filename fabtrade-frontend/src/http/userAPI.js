import {$host, $authHost} from './index'
import { jwtDecode } from "jwt-decode"

export const registration = async (password, email) => {
    const {data} = await $host.post('/api/auth/register', {password, email})
    return data
}

export const confirmRegistration = async (confirmationCode, password, email) => {
    const { data } = await $host.post('/api/auth/confirm', { code: confirmationCode, password, email });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const login = async (email, password) => {
    const {data} = await $host.post('api/auth/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const oauth2Login = async (credential) => {
    try {
        const {data} = await $host.post('/api/auth/oauth2', { token: credential });
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    } catch (error) {
        console.error('Ошибка аутентификации с Google', error);
    }
}

export const check = async () => {
    try {   
        const {data} = await $authHost.get('/api/auth/check')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    }
    catch (e) {
        console.log('неавторизован')
    } 
}