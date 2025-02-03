import {$host, $authHost} from './index'

export const fetchTenders = async () => {
    const {data} = await $host.get('/api/tenders')
    return data
}

export const fetchTender = async (id) => {
    const {data} = await $host.get('/api/tenders/' + id)
    return data
}

export const confirmTender = async (id) => {
    const {data} = await $authHost.post('/api/tenders/' + id)
    return data
}

export const signTender = async (id) => {
    const {data} = await $authHost.post('/api/tenders/sign/' + id)
    return data
}

export const addTender = async (category_id, count, name, description, term) => {
    const {data} = await $authHost.post('/api/tenders', {category_id, count, name, description, term})
    return data
}
