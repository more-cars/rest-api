import {Given} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"

Given('there exists a(n) {string} {string} with {string} {string}',
    async (nodeType: string, label: string, property: string, propertyValue: string) => {
        await NodeManager.createNode(nodeType, label, {
            [property]: propertyValue,
        })
    })
