import {$host, $authHost} from './index'

export const fetchRequests = async (id) => {
    const {data} = await $authHost.get('/api/requests/tender/' + id)
    return data
}

export const fetchRequest = async (id) => {
    const {data} = await $authHost.get('/api/requests/' + id)
    return data
}

export const getWinnerRequest = async (id) => {
    const {data} = await $host.get('/api/requests/winner/' + id)
    return data
}

export const addRequest = async (formData) => {
    const { data } = await $authHost.post('/api/requests', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

export const fetchMyRequests = async () => {
    const {data} = await $authHost.get('/api/requests/my')
    return data
}
