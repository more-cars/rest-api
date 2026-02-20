import {Given, world} from "@cucumber/cucumber"
import type {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"

Given('there exists a(n) {string} {string} with {string} {string}',
    async (nodeType: string, label: string, property: string, propertyValue: string) => {
        const node = await seedNode(nodeType.toLowerCase() as ControllerNodeType, {
            [property]: propertyValue,
        })

        world.rememberNode(node, label, nodeType.toLowerCase())
    })
