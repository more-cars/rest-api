import {Given, world} from "@cucumber/cucumber"
import type {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"

Given('there exists a(n) {string} {string}',
    async (nodeType: string, label: string) => {
        world.rememberNode(
            await seedNode(nodeType.toLowerCase() as ControllerNodeType),
            label,
            nodeType.toLowerCase()
        )
    })
