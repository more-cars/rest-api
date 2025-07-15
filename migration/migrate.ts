import {migrateNodes} from "./migrateNodes"
import {migrateRelationships} from "./migrateRelationships"

migrateAll().then(() => {
    console.log('finished')
})

async function migrateAll() {
    await migrateNodes()
    await migrateRelationships()
}
