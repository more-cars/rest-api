import {NodeTypeMapping} from "./src/NodeTypeMapping"
import type {NodeTypeLabelOld} from "./src/types/NodeTypeLabelOld"
import {deleteNodesOfType} from "./src/deleteNodesOfType"
import {fetchOldNodesOfType} from "./src/fetchOldNodesOfType"
import cliProgress from "cli-progress"
import {mapNodeProperties} from "./src/mapNodeProperties"
import {storeNode} from "./src/storeNode"
import {DbNodeType} from "../src/db/types/DbNodeType"

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

    console.log(`Starting migration of ${records.length} '${newNodeType}' nodes`)

    progress.start(records.length, 0)
    for (const record of records) {
        const oldNode = record.get('node')
        const newNode = mapNodeProperties(oldNode, newNodeType)
        await storeNode(newNode, newNodeType, oldNode)
        progress.increment(1)
    }
    progress.stop()

    console.log(`Migration finished`)
}

function determineNodeType() {
    const nodeType = process.env.MIGRATE_NODE_TYPE

    if (!nodeType && nodeType === "") {
        throw new Error('Node type missing')
    }

    return nodeType as DbNodeType
}

function determineDeleteNodes() {
    const deleteNodes = process.env.DELETE_EXISTING_DATA

    return deleteNodes === 'true'
}

migrateNodesOfType().then(() => true)
