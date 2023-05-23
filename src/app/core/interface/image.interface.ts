export interface IFullImage {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    image: Image
  }
  
  export interface Image {
    id: number
    name: string
    alternativeText: any
    caption: any
    width: number
    height: number
    formats: Formats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: any
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
  }
  
  export interface Formats {
    thumbnail: Thumbnail
    large: Large
    medium: Medium
    small: Small
  }
  
  export interface Thumbnail {
    name: string
    hash: string
    ext: string
    mime: string
    path: any
    width: number
    height: number
    size: number
    url: string
  }
  
  export interface Large {
    name: string
    hash: string
    ext: string
    mime: string
    path: any
    width: number
    height: number
    size: number
    url: string
  }
  
  export interface Medium {
    name: string
    hash: string
    ext: string
    mime: string
    path: any
    width: number
    height: number
    size: number
    url: string
  }
  
  export interface Small {
    name: string
    hash: string
    ext: string
    mime: string
    path: any
    width: number
    height: number
    size: number
    url: string
  }
  