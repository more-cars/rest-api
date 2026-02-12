import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {GamingPlatformNode} from "../../../../../../src/models/gaming-platforms/types/GamingPlatformNode"
import {GamingPlatform} from "../../../../../../src/models/gaming-platforms/GamingPlatform"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all GAMING PLATFORM nodes" request returns only the matching nodes', () => {
    test('when there exist no GAMING PLATFORM nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.GAMING_PLATFORM)

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
        await deleteAllNodesOfType(NodeTypeEnum.GAMING_PLATFORM)
        const nodeA = await seedNode(NodeTypeEnum.GAMING_PLATFORM, {name: 'A Node'}) as GamingPlatformNode
        await seedNode(NodeTypeEnum.GAMING_PLATFORM, {name: 'B Node'})
        await seedNode(NodeTypeEnum.GAMING_PLATFORM, {name: 'C Node'})

        const filteredNodes = await GamingPlatform.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
