import {makeAutoObservable} from "mobx"

export default class RequestStore {
    constructor() {
        this._request = []
        makeAutoObservable(this)
    }

    setRequest(request) {
        this._request = request
    }

    get request() {
        return this._request
    }
    
}