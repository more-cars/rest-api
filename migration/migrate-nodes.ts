import {confirm, select} from "@inquirer/prompts"
import {NodeTypeMapping} from "./lib/NodeTypeMapping"
import type {NodeTypeLabel} from "../src/db/NodeTypeLabel"
import {fetchOldNodesOfType} from "./lib/fetchOldNodesOfType"
import type {NodeTypeLabelOld} from "./lib/types/NodeTypeLabelOld"
import {mapNodeProperties} from "./lib/mapNodeProperties"
import {storeNode} from "./lib/storeNode"
import cliProgress from "cli-progress"
import {deleteNodesOfType} from "./lib/deleteNodesOfType"

migrateNodesOfType().then(() => true)

async function migrateNodesOfType() {
    const newNodeType = await promptNodeType()
    const oldNodeType = NodeTypeMapping.get(newNodeType) as NodeTypeLabelOld

    const deleteNodes = await promptDeleteNodes()
    if (deleteNodes) {
        await deleteNodesOfType(newNodeType)
    }

    const records = await fetchOldNodesOfType(oldNodeType)
    const progress = new cliProgress.SingleBar({
        format: `{bar} | ${newNodeType} | ETA: {eta}s | {value}/{total}`
    })

    progress.start(records.length, 0)
    for (const record of records) {
        const oldNode = record.get('node')
        const newNode = mapNodeProperties(oldNode, newNodeType)
        await storeNode(newNode, newNodeType, oldNode)
        progress.increment(1)
    }
    progress.stop()
}

async function promptNodeType() {
    const choices = [
        {value: 'Company'},
        {value: 'Brand'},
        {value: 'CarModel'},
        {value: 'Image'},
    ]

    const nodeType = await select({
        message: 'Migrating all nodes of which type?',
        choices,
    })

    return nodeType as NodeTypeLabel
}

async function promptDeleteNodes() {
    return confirm({
        message: 'Should all existing nodes of the selected type be DELETED from the target database before migration?',
        default: true,
    })
}
