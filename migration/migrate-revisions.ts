import cliProgress from "cli-progress"
import {NodeTypeLabelOld} from "./src/types/NodeTypeLabelOld"
import {fetchOldNodesOfType} from "./src/fetchOldNodesOfType"
import {mapNodeProperties} from "./src/mapNodeProperties"
import {storeNode} from "./src/storeNode"
import {DbNodeType} from "../src/db/types/DbNodeType"
import {closeDriver} from "../src/db/driver"

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
        await storeNode(newNodeData, DbNodeType.Revision, oldNode)
        progress.increment(1)
    }
    await closeDriver()
    progress.stop()

    console.log(`Migration finished`)
}
