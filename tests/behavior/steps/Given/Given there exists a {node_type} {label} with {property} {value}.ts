import {Given} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {convertStringToExpectedNodeType} from "../../../_toolbox/convertStringToNodeType"

Given('there exists a(n) {string} {string} with {string} {string}',
    async (nodeType: string, label: string, property: string, propertyValue: string) => {
        const node = getFakeNode(convertStringToExpectedNodeType(nodeType))

        // @ts-ignore
        node.dbInputMinimal[property] = isNaN(propertyValue) ? propertyValue : Number(propertyValue)

        await NodeManager.createNode(nodeType, label, node.dbInputMinimal)
    })
