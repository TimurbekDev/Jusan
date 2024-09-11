import NodeCache from "node-cache";

const myCache = new NodeCache({ stdTTL: 120, checkperiod: 120 })

export const setItem = (key, value) => {
    myCache.set(key, value)
}

export const getItem = (key) => {
    return myCache.get(key)
}