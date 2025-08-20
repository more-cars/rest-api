import {Given, world} from "@cucumber/cucumber"
import type {NodeType} from "../../_toolbox/NodeType"
import {seedNode} from "../../_toolbox/dbSeeding/seedNode"

Given('there exists a(n) {string} {string}',
    async (nodeType: string, label: string) => {
        world.rememberNode(
            await seedNode(nodeType.toLowerCase() as NodeType),
            label,
        )
    })
