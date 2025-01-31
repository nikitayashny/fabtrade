import {$host, $authHost} from './index'

export const fetchTenders = async () => {
    const {data} = await $host.get('/api/tenders')
    return data
}