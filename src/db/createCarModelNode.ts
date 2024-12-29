import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "./driver"
import {CarModelType} from "../types/CarModelType"

export async function createCarModelNode(carModelData: CarModelType) {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const createdNode = await createCarModel(carModelData, driver)

    await session.close()
    await closeDriver(driver)

    return createdNode
}

async function createCarModel(carModelData: CarModelType, driver: Driver) {
    const {records} = await driver.executeQuery(
        'CREATE (cm:CarModel {name: $name, mc_id: $mc_id}) RETURN cm',
        carModelData,
    )

    const dbNode: CarModelType = records.map(record => record.get('cm'))[0].properties

    return dbNode
}
