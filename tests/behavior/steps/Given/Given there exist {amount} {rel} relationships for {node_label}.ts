import {Given, world} from "@cucumber/cucumber"
import type {NodeType} from "../../../_toolbox/NodeType"
import * as changeCase from "change-case"
import type {DbRelationship} from "../../../../src/db/types/DbRelationship"
import {seedRelationshipForNode} from "../../../_toolbox/dbSeeding/seedRelationshipForNode"
import type {BaseNode} from "../../../../src/db/types/BaseNode"

Given('there exist {int} {string} relationships for {string}',
    async (amount: number, relationshipName: string, startNodeLabel: string) => {
        const startNode: BaseNode = world.recallNode(startNodeLabel).data
        const startNodeType: NodeType = world.recallNode(startNodeLabel).nodeType

        for (let i = 0; i < amount; i++) {
            await seedRelationshipForNode(startNode, startNodeType, changeCase.constantCase(relationshipName) as DbRelationship)
        }
    })
