import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {GamingPlatformNode} from "../../../../../../src/models/node-types/gaming-platforms/types/GamingPlatformNode"
import {GamingPlatform} from "../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all GAMING PLATFORM nodes" request returns only the matching nodes', () => {
    test('when there exist no GAMING PLATFORM nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.GAMING_PLATFORM)

        const expectedNodes: GamingPlatformNode[] = []
        const actualNodes = await GamingPlatform.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist GAMING PLATFORM nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.GAMING_PLATFORM)
        const nodeA = await seedNode(ControllerNodeType.GAMING_PLATFORM, {
            name: 'A Node'
        }) as unknown as GamingPlatformNode
        await seedNode(ControllerNodeType.GAMING_PLATFORM, {name: 'B Node'})
        await seedNode(ControllerNodeType.GAMING_PLATFORM, {name: 'C Node'})

        const filteredNodes = await GamingPlatform.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
