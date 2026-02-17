import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/companies/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'BMW AG''",
        founded: 1916,
        defunct: null,
        headquarters_location: "'Munich''",
        legal_headquarters_location: "'Munich''",
    }

    const createdNode = await createNode(data)

    expect(createdNode.name)
        .toEqual("'BMW AG''")

    expect(createdNode.headquarters_location)
        .toEqual("'Munich''")

    expect(createdNode.legal_headquarters_location)
        .toEqual("'Munich''")
})
