import {makeAutoObservable} from "mobx"

export default class TenderStore {
    constructor() {
        this._tender = []
        makeAutoObservable(this)
    }

    setTender(tender) {
        this._tender = tender
    }

    get tender() {
        return this._tender
    }
    
}