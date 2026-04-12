import {expect, test} from 'vitest'
import {InputCompanyCreate} from "../../../../../src/db/node-types/companies/types/InputCompanyCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputCompanyCreate = {
        name: "'BMW AG",
        founded: null,
        defunct: null,
        headquarters_location: "'Munich",
        hq_country_code: "'DE",
        legal_headquarters_location: "'Munich",
        legal_hq_country_code: "'DE",
    }

    const query = createNodeQuery(DbNodeType.Company, data)

    expect(query)
        .toEqual(
            "CREATE (node:Company_A_" + appInstanceId + " {\n" +
            "  name: '\\'BMW AG',\n" +
            "  founded: null,\n" +
            "  defunct: null,\n" +
            "  headquarters_location: '\\'Munich',\n" +
            "  hq_country_code: '\\'DE',\n" +
            "  legal_headquarters_location: '\\'Munich',\n" +
            "  legal_hq_country_code: '\\'DE'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
