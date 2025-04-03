import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "./driver"
import {CarModelType} from "../types/CarModelType"
import {dbCarModelType} from "./types/dbCarModelType"

export async function createCarModelNode(carModelData: CarModelType): Promise<dbCarModelType> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const createdNode = await createCarModel(carModelData, driver)

    await session.close()
    await closeDriver(driver)

    return createdNode
}

async function createCarModel(carModelData: CarModelType, driver: Driver): Promise<dbCarModelType> {
    // 1. Creating the node in the database
    const {records} = await driver.executeQuery(`
            CREATE (cm:CarModel {name: $name}) 
            RETURN cm 
            LIMIT 1`,
        carModelData,
    )
    const dbNode = records[0].get('cm')

    // 2. Adding a custom More Cars ID for that node
    // Note: This seems pointless at first glance, because the More Cars ID is exactly the same as the Neo4j ID.
    //       The benefit: we can modify the More Cars ID anytime, while the Neo4j ID is always read-only.
    //       This will become relevant when migrating nodes from the old database.
    //       In that scenario we need to be able to carry over the existing IDs.
    const elementId = dbNode.elementId
    const elementIdSplit: Array<string> = elementId.split(':')
    const moreCarsId: number = parseInt(elementIdSplit[2])
    await setMoreCarsId(elementId, moreCarsId, driver)

    // 3. Adding the More Cars ID to the response object
    let nodeData: dbCarModelType = dbNode.properties
    nodeData['mc_id'] = moreCarsId

    return nodeData
}

async function setMoreCarsId(elementId: string, moreCarsId: number, driver: Driver) {
    await driver.executeQuery(`
        MATCH (cm:CarModel) 
        WHERE elementId(cm) = "${elementId}"
        SET cm.mc_id = ${moreCarsId}`,
    )
}
