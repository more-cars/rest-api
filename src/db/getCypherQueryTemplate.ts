import fs from 'node:fs'

export function getCypherQueryTemplate(path: string) {
    return fs.readFileSync(__dirname + '/' + path, 'utf8')
}
