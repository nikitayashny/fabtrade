import {$host, $authHost} from './index'

export const registration = async (password, email) => {
    const {data} = await $host.post('/api/auth/register', {password, email})
    return data
}

export const confirmRegistration = async (confirmationCode, password, email) => {
    const { data } = await $host.post('/api/auth/confirm', { code: confirmationCode, password, email });
    localStorage.setItem('token', data.token);
    return data.user;
};

export const verify = async (formData) => {
    const {data} = await $authHost.post('/api/users/verify', formData)
    return data
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/auth/login', {email, password})
    localStorage.setItem('token', data.token)
    return data.user
}

export const oauth2Login = async (credential) => {
    try {
        const {data} = await $host.post('/api/auth/oauth2', { token: credential });
        localStorage.setItem('token', data.token)
        return data.user
    } catch (error) {
        console.error('Ошибка аутентификации с Google', error);
    }
}

export const check = async () => {
    try {   
        const {data} = await $authHost.get('/api/auth/check')
        localStorage.setItem('token', data.token)
        return data.user
    }
    catch (e) {
        console.log('неавторизован')
    } 
}

export const fetchUsers = async () => {
    const {data} = await $host.get('/api/users')
    return data
}