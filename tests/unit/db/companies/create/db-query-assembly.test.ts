import {expect, test} from 'vitest'
import {InputCompanyCreate} from "../../../../../src/db/nodes/companies/types/InputCompanyCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a COMPANY node', async () => {
    const data: InputCompanyCreate = {
        name: "BMW AG",
        founded: 1916,
        defunct: null,
        headquarters_location: "Munich",
        legal_headquarters_location: "Munich"
    }

    const query = createNodeQuery(NodeTypeLabel.Company, data)

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
