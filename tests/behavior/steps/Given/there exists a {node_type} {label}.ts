import {Given} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"

Given('there exists a(n) {string} {string}',
    async (nodeType: string, label: string) => {
        await NodeManager.createNode(nodeType, label)
    })
