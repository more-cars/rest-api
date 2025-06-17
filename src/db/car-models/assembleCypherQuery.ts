import fs from 'node:fs'

export function assembleCypherQuery(id: number) {
    const data = fs.readFileSync(__dirname + '/getCarModelById.cypher', 'utf8')
    return data
        .trim()
        .replace('$id', id.toString())
}
