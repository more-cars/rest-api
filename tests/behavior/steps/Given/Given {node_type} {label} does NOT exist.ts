import {Given} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"

Given('{string} {string} does NOT exist',
    async (nodeType: string, label: string) => {
        NodeManager.cacheNode(nodeType, label, {
            id: -Math.ceil(Math.random() * 1000),
        })
    })
