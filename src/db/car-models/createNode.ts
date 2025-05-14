import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"
import {CarModelNode} from "../../types/CarModelNode"
import {CarModelNodeUserData} from "../../types/CarModelNodeUserData"

export async function createNode(carModelData: CarModelNodeUserData): Promise<CarModelNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const createdNode = await createCarModel(carModelData, driver)

    await session.close()
    await closeDriver(driver)

    return createdNode
}

async function createCarModel(carModelData: CarModelNodeUserData, driver: Driver): Promise<CarModelNode> {
    // 1. Creating the node in the database
    const {records} = await driver.executeQuery(`
            CREATE (node:CarModel {
                name: $name, 
                built_from: $built_from,
                built_to: $built_to,
                generation: $generation,
                internal_code: $internal_code,
                total_production: $total_production
            }) 
            RETURN node 
            LIMIT 1`,
        {
            name: carModelData.name,
            built_from: carModelData.built_from ?? null,
            built_to: carModelData.built_to ?? null,
            generation: carModelData.generation ?? null,
            internal_code: carModelData.internal_code ?? null,
            total_production: carModelData.total_production ?? null,
        },
    )
    const createdDbNode: Node = records[0].get('node')

    // 2. Adding a custom More Cars ID for that node
    // Note: This seems pointless at first glance, because the More Cars ID is exactly the same as the Neo4j ID.
    //       The benefit: we can modify the More Cars ID anytime, while the Neo4j ID is always read-only.
    //       This will become relevant when migrating nodes from the old database.
    //       In that scenario we need to be able to carry over the existing IDs.
    const elementId = createdDbNode.elementId
    const elementIdSplit: Array<string> = elementId.split(':')
    const moreCarsId: number = parseInt(elementIdSplit[2])
    const enrichedDbNode: Node = await setMoreCarsId(elementId, moreCarsId, driver)

    // 3. Converting the Neo4j node to a More Cars node
    const node: CarModelNode = {
        id: enrichedDbNode.properties.mc_id,
        name: enrichedDbNode.properties.name,
        built_from: enrichedDbNode.properties.built_from,
        built_to: enrichedDbNode.properties.built_to,
        generation: enrichedDbNode.properties.generation,
        internal_code: enrichedDbNode.properties.internal_code,
        total_production: enrichedDbNode.properties.total_production,
    }

    return node
}

async function setMoreCarsId(elementId: string, moreCarsId: number, driver: Driver): Promise<Node> {
    const {records} = await driver.executeQuery(`
        MATCH (node:CarModel) 
        WHERE elementId(node) = "${elementId}"
        SET node.mc_id = ${moreCarsId}
        RETURN node
        LIMIT 1
    `)

    return records[0].get('node')
}
