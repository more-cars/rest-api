import {expect, test} from 'vitest'
import {CompanyNode} from "../../../../../src/models/node-types/companies/types/CompanyNode"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {convertCompanyModelNodeToControllerNode} from "../../../../../src/controllers/node-types/companies/convertCompanyModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../src/controllers/types/ControllerNodeType"

test("converting a COMPANY node", async () => {
    const node: CompanyNode = {
        node_type: ModelNodeType.Company,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "BMW AG",
            founded: 1916,
            defunct: null,
            headquarters_location: "Munich",
            legal_headquarters_location: "Munich",
        }
    }

    const convertedNode = convertCompanyModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.Company,
            fields: {
                id: 1,
                name: "BMW AG",
                founded: 1916,
                defunct: null,
                headquarters_location: "Munich",
                legal_headquarters_location: "Munich",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
