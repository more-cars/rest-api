import {Given, world} from "@cucumber/cucumber"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {pascalCase} from "change-case"
import type {DbNodeType} from "../../../../src/db/types/DbNodeType"

Given('there exists a(n) {string} {string}',
    async (nodeType: string, label: string) => {
        world.rememberNode(
            await seedNode(pascalCase(nodeType) as DbNodeType),
            label,
            nodeType.toLowerCase()
        )
    })
