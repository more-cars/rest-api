import {confirm, select} from "@inquirer/prompts"
import {NodeTypeMapping} from "./src/NodeTypeMapping"
import type {NodeTypeLabel} from "../src/db/NodeTypeLabel"
import {fetchOldNodesOfType} from "./src/fetchOldNodesOfType"
import type {NodeTypeLabelOld} from "./src/types/NodeTypeLabelOld"
import {mapNodeProperties} from "./src/mapNodeProperties"
import {storeNode} from "./src/storeNode"
import cliProgress from "cli-progress"
import {deleteNodesOfType} from "./src/deleteNodesOfType"
import {getAllNodeTypes} from "../tests/_toolbox/getAllNodeTypes"

migrateNodesOfType().then(() => true)

async function migrateNodesOfType() {
    const newNodeType = await determineNodeType(process.env.MIGRATE_NODE_TYPE)
    const oldNodeType = NodeTypeMapping.get(newNodeType) as NodeTypeLabelOld

    const deleteNodes = await determineDeleteNodes(process.env.DELETE_EXISTING_NODES)
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

async function determineNodeType(override: string | undefined) {
    if (override && override !== "") {
        return override as NodeTypeLabel
    }

    return promptNodeType()
}

async function promptNodeType() {
    const choices = getAllNodeTypes()

    const nodeType = await select({
        message: 'Migrating all nodes of which type?',
        choices,
    })

    return nodeType as NodeTypeLabel
}

async function determineDeleteNodes(override: string | undefined) {
    if (override && override !== "") {
        return override === 'true'
    }

    return promptDeleteNodes()
}

async function promptDeleteNodes() {
    return confirm({
        message: 'Should all existing nodes of the selected type be DELETED from the target database before migration?',
        default: true,
    })
}
