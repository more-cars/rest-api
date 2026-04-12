import cliProgress from "cli-progress"
import {NodeTypeMapping} from "./src/NodeTypeMapping"
import {NodeTypeLabelOld} from "./src/types/NodeTypeLabelOld"
import {fetchOldRelationshipsOfType} from "./src/fetchOldRelationshipsOfType"
import {DbNodeType} from "../src/db/types/DbNodeType"
import type {Node} from "neo4j-driver"
import {updateCountryCode} from "./src/updateCountryCode"
import {getCountryRelationshipType} from "./src/getCountryRelationshipType"

migrateCountryCodes().then(() => true)

async function migrateCountryCodes() {
    const newStartNodeType = await determineStartNodeType()
    const oldStartNodeType = NodeTypeMapping.get(newStartNodeType) as NodeTypeLabelOld
    const oldEndNodeType = NodeTypeLabelOld.Country
    const oldRelationshipType = getCountryRelationshipType(newStartNodeType)

    const records = await fetchOldRelationshipsOfType(oldRelationshipType, oldStartNodeType, oldEndNodeType)

    const progress = new cliProgress.SingleBar({
        format: `{bar} | ${newStartNodeType} ${oldRelationshipType} ${oldEndNodeType} | ETA: {eta}s | {value}/{total}`
    })

    console.log(`Starting migration of ${records.length} '${oldRelationshipType}' relationships`)

    progress.start(records.length, 0)
    for (const record of records) {
        const startNode: Node = record.get('a')
        const countryNode: Node = record.get('b')

        await updateCountryCode(Number(startNode.identity) + 10_000_000, countryNode.properties.code)

        progress.increment(1)
    }
    progress.stop()

    console.log(`Migration finished`)
}

async function determineStartNodeType() {
    const startNodeType = process.env.START_NODE_TYPE

    if (!startNodeType && startNodeType === "") {
        throw new Error('Start node type missing')
    }

    return startNodeType as DbNodeType
}
