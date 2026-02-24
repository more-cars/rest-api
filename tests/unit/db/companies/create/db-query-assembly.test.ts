import {expect, test} from 'vitest'
import {InputCompanyCreate} from "../../../../../src/db/node-types/companies/types/InputCompanyCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a COMPANY node', async () => {
    const data: InputCompanyCreate = {
        name: "BMW AG",
        founded: 1916,
        defunct: null,
        headquarters_location: "Munich",
        legal_headquarters_location: "Munich"
    }

    const query = createNodeQuery(DbNodeType.Company, data)

    expect(query)
        .toEqual(
            "CREATE (node:Company_" + appInstanceId + " {\n" +
            "  name: 'BMW AG',\n" +
            "  founded: 1916,\n" +
            "  defunct: null,\n" +
            "  headquarters_location: 'Munich',\n" +
            "  legal_headquarters_location: 'Munich'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
