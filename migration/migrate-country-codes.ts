import cliProgress from "cli-progress"
import {NodeTypeMapping} from "./src/NodeTypeMapping"
import {NodeTypeLabelOld} from "./src/types/NodeTypeLabelOld"
import {fetchOldRelationshipsOfType} from "./src/fetchOldRelationshipsOfType"
import {DbNodeType} from "../src/db/types/DbNodeType"
import type {Node} from "neo4j-driver"
import {updateCountryCode} from "./src/updateCountryCode"
import {getCountryRelationshipType} from "./src/getCountryRelationshipType"
import {RelationshipTypeLabelOld} from "./src/types/RelationshipTypeLabelOld"
import {closeDriver} from "../src/db/driver"

(async () => {
    const newStartNodeType = await determineStartNodeType()
    const oldStartNodeType = NodeTypeMapping.get(newStartNodeType) as NodeTypeLabelOld
    const oldEndNodeType = NodeTypeLabelOld.Country
    const oldRelationshipType = getCountryRelationshipType(newStartNodeType)

    await migrateCountryCodes(oldRelationshipType, oldStartNodeType, oldEndNodeType)

    if (newStartNodeType === DbNodeType.Company) {
        await migrateCountryCodes(RelationshipTypeLabelOld.CompanyLegalHqInCountry, oldStartNodeType, oldEndNodeType)
    }
})()

async function migrateCountryCodes(oldRelationshipType: RelationshipTypeLabelOld, oldStartNodeType: NodeTypeLabelOld, oldEndNodeType: NodeTypeLabelOld) {
    let records
    if (oldRelationshipType === RelationshipTypeLabelOld.PriceInCountry) {
        records = await fetchOldRelationshipsOfType(oldRelationshipType, oldEndNodeType, oldStartNodeType)
    } else {
        records = await fetchOldRelationshipsOfType(oldRelationshipType, oldStartNodeType, oldEndNodeType)
    }

    const progress = new cliProgress.SingleBar({
        format: `{bar} | ${oldStartNodeType} ${oldRelationshipType} ${oldEndNodeType} | ETA: {eta}s | {value}/{total}`
    })

    console.log(`Starting migration of ${records.length} '${oldRelationshipType}' relationships`)

    progress.start(records.length, 0)
    for (const record of records) {
        const startNode = record.get('a') as Node
        const countryNode = record.get('b') as Node

        if (oldStartNodeType === NodeTypeLabelOld.Company && oldRelationshipType === RelationshipTypeLabelOld.CompanyOriginatesFromCountry) {
            await updateCountryCode(Number(startNode.identity) + 10_000_000, countryNode.properties.code, 'hq_country_code')
        } else if (oldStartNodeType === NodeTypeLabelOld.Company && oldRelationshipType === RelationshipTypeLabelOld.CompanyLegalHqInCountry) {
            await updateCountryCode(Number(startNode.identity) + 10_000_000, countryNode.properties.code, 'legal_hq_country_code')
        } else if (oldRelationshipType === RelationshipTypeLabelOld.PriceInCountry) {
            await updateCountryCode(Number(countryNode.identity) + 10_000_000, startNode.properties.code)
        } else {
            await updateCountryCode(Number(startNode.identity) + 10_000_000, countryNode.properties.code)
        }

        progress.increment(1)
    }
    await closeDriver()
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
