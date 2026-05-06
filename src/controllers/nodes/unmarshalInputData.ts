import type {RawInputData} from "../types/RawInputData"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data, validPropertyNames: string[]): RawInputData {
    const unmarshalledData: RawInputData = {}

    for (const prop of validPropertyNames) {
        if (data && typeof data[prop] === 'string') {
            unmarshalledData[prop] = data[prop] ? data[prop].trim() : undefined
        } else if (data && data[prop] === null) {
            unmarshalledData[prop] = null
        } else if (!data) {
            unmarshalledData[prop] = undefined
        } else {
            unmarshalledData[prop] = data[prop] ? data[prop] : undefined
        }
    }

    return unmarshalledData
}
