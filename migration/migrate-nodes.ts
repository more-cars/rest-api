import {NodeTypeMapping} from "./src/NodeTypeMapping"
import type {NodeTypeLabelOld} from "./src/types/NodeTypeLabelOld"
import {deleteNodesOfType} from "./src/deleteNodesOfType"
import {fetchOldNodesOfType} from "./src/fetchOldNodesOfType"
import cliProgress from "cli-progress"
import {mapNodeProperties} from "./src/mapNodeProperties"
import {storeNode} from "./src/storeNode"
import type {NodeTypeLabel} from "../src/db/NodeTypeLabel"

async function migrateNodesOfType() {
    const newNodeType = determineNodeType()
    const oldNodeType = NodeTypeMapping.get(newNodeType) as NodeTypeLabelOld

    const deleteNodes = determineDeleteNodes()
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

function determineNodeType() {
    const nodeType = process.env.MIGRATE_NODE_TYPE

    if (!nodeType && nodeType === "") {
        throw new Error('Node type missing')
    }

    return nodeType as NodeTypeLabel
}

function determineDeleteNodes() {
    const deleteNodes = process.env.DELETE_EXISTING_DATA

    return deleteNodes === 'true'
}

migrateNodesOfType().then(() => true)
