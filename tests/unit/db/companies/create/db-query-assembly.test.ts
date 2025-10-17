import {expect, test} from 'vitest'
import {createNodeQuery} from "../../../../../src/db/nodes/companies/createNode"
import {InputCompanyCreate} from "../../../../../src/db/nodes/companies/types/InputCompanyCreate"

test('cypher query is correctly assembled', async () => {
    const data: InputCompanyCreate = {
        name: "BMW AG",
        founded: 1916,
        defunct: null,
        headquarters_location: "Munich",
        legal_headquarters_location: "Munich"
    }

    const query = createNodeQuery(data)

    expect(query)
        .toEqual(
            "CREATE (node:Company {\n" +
            "  name: 'BMW AG',\n" +
            "  founded: 1916,\n" +
            "  defunct: null,\n" +
            "  headquarters_location: 'Munich',\n" +
            "  legal_headquarters_location: 'Munich'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
