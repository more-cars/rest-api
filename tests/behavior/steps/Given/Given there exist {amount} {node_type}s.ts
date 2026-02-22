import {Given} from "@cucumber/cucumber"
import {deleteAllNodesOfType} from "../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {seedNodes} from "../../../_toolbox/dbSeeding/seedNodes"
import {pascalCase} from "change-case"
import type {DbNodeType} from "../../../../src/db/types/DbNodeType"

Given('there exist {int} {string}s', {timeout: 30000}, async function (amount: number, nodeType: string) {
    await deleteAllNodesOfType(pascalCase(nodeType) as DbNodeType)
    await seedNodes(pascalCase(nodeType) as DbNodeType, amount)
})
