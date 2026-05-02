import cliProgress from "cli-progress"
import {fetchOldNodesOfType} from "./src/fetchOldNodesOfType"
import {NodeTypeLabelOld} from "./src/types/NodeTypeLabelOld"
import {mapNodeProperties} from "./src/mapNodeProperties"
import {DbNodeType} from "../src/db/types/DbNodeType"
import {storeNode} from "./src/storeNode"
import {setTimestampsForNode} from "../src/db/nodes/setTimestampsForNode"
import {closeDriver} from "../src/db/driver"
import type {DbNode} from "../src/db/types/DbNode"

(async () => {
    await migrateRevisions()
})()

async function migrateRevisions() {
    const records = await fetchOldNodesOfType(NodeTypeLabelOld.Revision)

    const progress = new cliProgress.SingleBar({
        format: `{bar} | Revisions | ETA: {eta}s | {value}/{total}`
    })

    console.log(`Starting migration of ${records.length} revisions`)

    progress.start(records.length, 0)
    for (const record of records) {
        const oldNode = record.get('n')
        const newNodeData = mapNodeProperties(oldNode, DbNodeType.Revision)
        const dbNode = await storeNode(newNodeData, DbNodeType.Revision, oldNode) as DbNode
        await setTimestampsForNode(dbNode.properties.id, oldNode.properties.created_at.replace(' ', 'T').concat('Z'), oldNode.properties.updated_at.replace(' ', 'T').concat('Z'))
        progress.increment(1)
    }
    await closeDriver()
    progress.stop()

    console.log(`Migration finished`)
}
