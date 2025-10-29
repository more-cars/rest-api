import {Given} from "@cucumber/cucumber"
import {deleteAllNodesOfType} from "../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {seedNodes} from "../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"

Given('there exist {int} {string}s', {timeout: 30000}, async function (amount: number, nodeType: string) {
    await deleteAllNodesOfType(nodeType.toLowerCase() as NodeTypeEnum)
    await seedNodes(nodeType.toLowerCase() as NodeTypeEnum, amount)
})
