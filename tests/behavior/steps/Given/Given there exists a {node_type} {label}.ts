import {Given, world} from "@cucumber/cucumber"
import type {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"

Given('there exists a(n) {string} {string}',
    async (nodeType: string, label: string) => {
        world.rememberNode(
            await seedNode(nodeType.toLowerCase() as NodeTypeEnum),
            label,
            nodeType.toLowerCase()
        )
    })
