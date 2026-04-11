export type WikimediaImageItem = {
    user: string
    width: number
    height: number
    thumburl: string
    thumbwidth: number
    thumbheight: number
    url: string
    descriptionurl: string
    mediatype: 'BITMAP' | 'DRAWING'
    extmetadata: {
        ObjectName: {
            value: string
        }
        ImageDescription: {
            value: string
        }
        LicenseShortName: {
            value: string
        }
    }
}
