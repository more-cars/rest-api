import {confirm, select} from "@inquirer/prompts"
import {NodeTypeMapping} from "./lib/NodeTypeMapping"
import {NodeTypeLabel} from "../src/db/NodeTypeLabel"
import type {NodeTypeLabelOld} from "./lib/types/NodeTypeLabelOld"
import cliProgress from "cli-progress"
import {DbRelationship} from "../src/db/types/DbRelationship"
import {fetchOldRelationshipsOfType} from "./lib/fetchOldRelationshipsOfType"
import {RelationshipTypeMapping} from "./lib/RelationshipTypeMapping"
import {deleteAllRelationshipsOfType} from "../tests/_toolbox/dbSeeding/deleteAllRelationshipsOfType"
import type {RelationshipTypeLabelOld} from "./lib/types/RelationshipTypeLabelOld"
import {createDbRelationship} from "../src/db/relationships/createDbRelationship"
import {addMoreCarsIdToRelationship} from "../src/db/relationships/addMoreCarsIdToRelationship"
import {addTimestampsToRelationship} from "../src/db/relationships/addTimestampsToRelationship"
import {getAllNodeTypes} from "../tests/_toolbox/getAllNodeTypes"
import {getAllPotentialPartnerNodeTypes} from "./lib/getAllPotentialPartnerNodeTypes"
import {getAllRelationshipTypes} from "./lib/getAllRelationshipTypes"

migrateRelationshipsOfType().then(() => true)

async function migrateRelationshipsOfType() {
    const newStartNodeType = await promptStartNodeType()
    const oldStartNodeType = NodeTypeMapping.get(newStartNodeType) as NodeTypeLabelOld
    const newEndNodeType = await promptEndNodeType(newStartNodeType)
    const oldEndNodeType = NodeTypeMapping.get(newEndNodeType) as NodeTypeLabelOld
    const newRelationshipType = await promptRelationshipType(newStartNodeType, newEndNodeType)
    const oldRelationshipType = RelationshipTypeMapping.get(newRelationshipType) as RelationshipTypeLabelOld

    const deleteRelationships = await promptDeleteRelationships()
    if (deleteRelationships) {
        await deleteAllRelationshipsOfType(newRelationshipType, newStartNodeType, newEndNodeType)
    }

    let records
    if (isRelationshipReversedInOldDb(newRelationshipType)) {
        records = await fetchOldRelationshipsOfType(oldRelationshipType, oldEndNodeType, oldStartNodeType)
    } else {
        records = await fetchOldRelationshipsOfType(oldRelationshipType, oldStartNodeType, oldEndNodeType)
    }

    const progress = new cliProgress.SingleBar({
        format: `{bar} | ${newStartNodeType} ${newRelationshipType} ${newEndNodeType} | ETA: {eta}s | {value}/{total}`
    })

    progress.start(records.length, 0)
    for (const record of records) {
        const oldRelationship = record.get('rel')
        let newRelationship
        if (isRelationshipReversedInOldDb(newRelationshipType)) {
            newRelationship = await createDbRelationship(parseInt(oldRelationship.end) + 10_000_000, parseInt(oldRelationship.start) + 10_000_000, newRelationshipType)
        } else {
            newRelationship = await createDbRelationship(parseInt(oldRelationship.start) + 10_000_000, parseInt(oldRelationship.end) + 10_000_000, newRelationshipType)
        }
        if (newRelationship) {
            await addMoreCarsIdToRelationship(newRelationship.elementId, parseInt(oldRelationship.elementId) + 10_000_000)
            await addTimestampsToRelationship(newRelationship.elementId, oldRelationship.properties.created_at, oldRelationship.properties.updated_at)
        } else {
            console.error('Relationship could not be migrated: #', oldRelationship.elementId)
        }
        progress.increment(1)
    }
    progress.stop()
}

async function promptStartNodeType() {
    // TODO disable all node types that that have no has-relationship (important for the next prompt)
    const nodeOptions = getAllNodeTypes()
    const choices = []

    for (const node of nodeOptions) {
        choices.push({value: node})
    }

    return select({
        message: 'Start node type of the relationship?',
        choices,
    })
}

async function promptEndNodeType(startNodeType: NodeTypeLabel) {
    const nodeOptions = getAllPotentialPartnerNodeTypes().get(startNodeType) as NodeTypeLabel[]
    const choices = []

    for (const node of nodeOptions) {
        choices.push({value: node})
    }

    return select({
        message: 'End node type of the relationship?',
        choices,
    })
}

async function promptRelationshipType(startNodeType: NodeTypeLabel, endNodeType: NodeTypeLabel) {
    const relationshipOptions = getAllRelationshipTypes().get(startNodeType)?.get(endNodeType) as DbRelationship[]
    const choices = []

    for (const relationship of relationshipOptions) {
        choices.push({value: relationship})
    }

    return select({
        message: 'Migrating all relationships of which type?',
        choices,
    })
}

async function promptDeleteRelationships() {
    return confirm({
        message: 'Should all existing relationships of the selected type be DELETED from the target database before migration?',
        default: true,
    })
}

function isRelationshipReversedInOldDb(relationshipType: DbRelationship) {
    if (relationshipType === 'HAS_PRIME_IMAGE') {
        return true
    }

    if (relationshipType === 'HAS_SUCCESSOR') {
        return true
    }

    return false
}
