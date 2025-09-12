import {expect, test} from 'vitest'
import {InputCompanyCreate} from "../../../../../src/db/nodes/companies/types/InputCompanyCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/companies/createNode"

test('single quotes are correctly escaped', async () => {
    const data: InputCompanyCreate = {
        name: "'BMW AG",
        founded: null,
        defunct: null,
        headquarters_location: "'Munich",
        legal_headquarters_location: "'Munich"
    }

    const query = createNodeQuery(data)

    expect(query)
        .toEqual(
            "CREATE (node:Company {\n" +
            "  name: '\\'BMW AG',\n" +
            "  founded: null,\n" +
            "  defunct: null,\n" +
            "  headquarters_location: '\\'Munich',\n" +
            "  legal_headquarters_location: '\\'Munich'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
