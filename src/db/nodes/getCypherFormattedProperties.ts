import type {DbInputData} from "../types/DbInputData"
import {escapeSingleQuotes} from "./escapeSingleQuotes"

export function getCypherFormattedProperties(data: DbInputData) {
    const lines: string[] = []

    for (const property in data) {
        if (data[property] === undefined) {
            continue
        }

        const line: string[] = []
        const indentation = '  '

        line.push(indentation)
        line.push(property)
        line.push(': ')

        if (data[property] === null) {
            line.push('null')
        }

        switch (typeof data[property]) {
            case 'string':
                line.push(`'${escapeSingleQuotes(data[property])}'`)
                break
            case 'number':
            case 'boolean':
                line.push(`${data[property]}`)
        }

        lines.push(line.join(''))
    }

    return lines.join(',\n')
}
