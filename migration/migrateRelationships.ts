import {getMc1Driver} from "../src/db/driver-mc1.ts"
import neo4j from "neo4j-driver"
import cliProgress from "cli-progress"
import {createDbRelationship} from "../src/db/relationships/createDbRelationship.ts"
import {DbRelationship} from "../src/db/types/DbRelationship.ts"
import {
    deleteBrandHasCarModelRelationships
} from "../tests/dbSeeding/brands/relationships/deleteBrandHasCarModelRelationships.ts"
import {
    deleteNodeHasImageRelationships
} from "../tests/dbSeeding/images/relationships/deleteNodeHasImageRelationships.ts"
import {addTimestampsToRelationship} from "../src/db/relationships/addTimestampsToRelationship.ts"
import {addMoreCarsIdToRelationship} from "../src/db/relationships/addMoreCarsIdToRelationship.ts"

export async function migrateRelationships() {
    await deleteBrandHasCarModelRelationships()
    await deleteNodeHasImageRelationships()

    await migrate('brand', 'BUILDS_CAR_MODEL', 'carmodel', DbRelationship.BrandHasCarModel)
    await migrate('brand', 'HAS_IMAGE', 'image', DbRelationship.NodeHasImage)
    await migrate('carmodel', 'HAS_IMAGE', 'image', DbRelationship.NodeHasImage)
}

async function migrate(
    oldStartNodeTypeLabel: string,
    oldRelationshipName: string,
    oldEndNodeTypeLabel: string,
    newRelationshipName: DbRelationship,
) {
    const driver = getMc1Driver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getOldRelationshipsQuery(oldStartNodeTypeLabel, oldRelationshipName, oldEndNodeTypeLabel))
        return result.records
    })

    const progress = new cliProgress.SingleBar({
        format: `{bar} | ${oldStartNodeTypeLabel} ${oldRelationshipName} ${oldEndNodeTypeLabel} | ETA: {eta}s | {value}/{total}`
    }, cliProgress.Presets.shades_classic)
    progress.start(records.length, 0)

    for (const record of records) {
        const relationshipOld = record.get('rel')

        try {
            const newRelationship = await createDbRelationship(relationshipOld.start, relationshipOld.end, newRelationshipName)
            if (newRelationship) {
                await addMoreCarsIdToRelationship(newRelationship.elementId, relationshipOld.elementId)
                await addTimestampsToRelationship(newRelationship.elementId, relationshipOld.properties.created_at, relationshipOld.properties.updated_at)
            }
        } catch (e) {
            console.error(e)
            console.error(relationshipOld)
        }

        progress.increment()
    }

    progress.stop()
    await session.close()
    await driver.close()

    return
}

function getOldRelationshipsQuery(startNode: string, relationshipName: string, endNode: string) {
    return `MATCH (a:${startNode})-[rel:${relationshipName}]->(:${endNode}) RETURN rel ORDER BY id(rel)`
}
