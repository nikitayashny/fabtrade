import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._email = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setEmail(email) {
        this._email = email
    }

    get isAuth() {
        return this._isAuth
    }
    get email() {
        return this._email
    }
    
    
}