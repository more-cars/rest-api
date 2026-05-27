import {Given} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"
import {convertNodeResponseToNode} from "../../lib/convertNodeResponseToNode"

Given('{string} {string} does NOT exist',
    async (nodeType: string, label: string) => {
        NodeManager.cacheNode(convertNodeResponseToNode({
            type: nodeType,
            id: -Math.ceil(Math.random() * 1000),
        }), label)
    })
