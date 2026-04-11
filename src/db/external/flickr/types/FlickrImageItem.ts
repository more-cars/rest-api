export type FlickrImageItem = {
    id: string
    license: string
    owner: {
        username: string
        realname: string
    }
    title: {
        _content: string
    }
    description: {
        _content: string
    }
    visibility: {
        ispublic: number
    }
    tags: {
        tag: {
            raw: string
            _content: string
        }[]
    }
    urls: {
        url: {
            type: string
            _content: string
        }[]
    }
    media: string
}
