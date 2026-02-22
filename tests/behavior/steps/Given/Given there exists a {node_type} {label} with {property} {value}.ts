import {Given, world} from "@cucumber/cucumber"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {pascalCase} from "change-case"
import type {DbNodeType} from "../../../../src/db/types/DbNodeType"

Given('there exists a(n) {string} {string} with {string} {string}',
    async (nodeType: string, label: string, property: string, propertyValue: string) => {
        const node = await seedNode(pascalCase(nodeType) as DbNodeType, {
            [property]: propertyValue,
        })

        world.rememberNode(node, label, nodeType.toLowerCase())
    })
