import type {RawInputData} from "../types/RawInputData"

export function unmarshalInputData(data: unknown, validPropertyNames: string[]): RawInputData {
    const unmarshalledData: RawInputData = {}

    for (const prop of validPropertyNames) {
        if (!isObject(data)) {
            unmarshalledData[prop] = undefined
        } else if (data[prop] === undefined) {
            unmarshalledData[prop] = undefined
        } else if (data[prop] === null) {
            unmarshalledData[prop] = null
        } else if (!['string', 'number', 'boolean'].includes(typeof data[prop])) {
            unmarshalledData[prop] = undefined
        } else if (typeof data[prop] === 'string') {
            unmarshalledData[prop] = data[prop].trim()
        } else if (typeof data[prop] === 'number') {
            unmarshalledData[prop] = data[prop]
        } else if (typeof data[prop] === 'boolean') {
            unmarshalledData[prop] = data[prop]
        }
    }

    return unmarshalledData
}

function isObject(value: unknown): value is Record<string, unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
    )
}
