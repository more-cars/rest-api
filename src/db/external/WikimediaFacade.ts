import {getImageById} from "./wikimedia/getImageById"

export const WikimediaFacade = {
    async getImageById(id: string) {
        return getImageById(id)
    },
}
