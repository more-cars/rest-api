import {Image} from "../Image"

export async function imageAlreadyExists(externalId: string) {
    const images = await Image.findAll({filterByProperty: 'external_id', filterValue: externalId})

    return images.length > 0
}
