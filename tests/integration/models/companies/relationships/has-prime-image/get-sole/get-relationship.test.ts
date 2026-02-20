import {describe, expect, test} from 'vitest'
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Requesting a ›has-prime-image‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(ControllerNodeType.COMPANY, ControllerNodeType.IMAGE, RelationshipType.CompanyHasPrimeImage)
        const actualRelationship = await Company.getHasPrimeImageRelationship(expectedRelationship.start_node.properties.id)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.properties.id)
            .toBe(expectedRelationship.start_node.properties.id)

        expect(actualRelationship.destination.properties.id)
            .toBe(expectedRelationship.end_node.properties.id)
    })

    test('node exists, but not the relationship', async () => {
        const company = await seedNode(ControllerNodeType.COMPANY)

        await expect(Company.getHasPrimeImageRelationship(company.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(Company.getHasPrimeImageRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
