class localStorageAdd {
    static setLocalStorage(key = `cart`, data = {}) {
        localStorage.setItem(`${key}`, `${JSON.stringify(data)}`)
    }
    static getLocalStorage(key = `cart`) {
        return JSON.parse(localStorage.getItem(`${key}`))
    }
}