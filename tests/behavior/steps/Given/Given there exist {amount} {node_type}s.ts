import {Given} from "@cucumber/cucumber"
import {deleteAllNodesOfType} from "../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {pascalCase} from "change-case"
import type {DbNodeType} from "../../../../src/db/types/DbNodeType"
import {NodeManager} from "../../lib/NodeManager"

Given('there exist {int} {string}s', {timeout: 30000}, async function (amount: number, nodeType: string) {
    await deleteAllNodesOfType(pascalCase(nodeType) as DbNodeType)

    for (let i = 0; i < amount; i++) {
        await NodeManager.createNode(nodeType, '')
    }
})
