import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/companies/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'BMW AG''",
        founded: 1916,
        defunct: null,
        headquarters_location: "'Munich''",
        hq_country_code: "'DE''",
        legal_headquarters_location: "'Munich''",
        legal_hq_country_code: "'DE''",
    }

    const createdNode = await createNode(data)

    expect(createdNode.properties.name)
        .toEqual("'BMW AG''")

    expect(createdNode.properties.headquarters_location)
        .toEqual("'Munich''")

    expect(createdNode.properties.hq_country_code)
        .toEqual("'DE''")

    expect(createdNode.properties.legal_headquarters_location)
        .toEqual("'Munich''")

    expect(createdNode.properties.legal_hq_country_code)
        .toEqual("'DE''")
})
