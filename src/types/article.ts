export interface Articles {
  status: string
  value: Article
}

export interface Article {
  totalAccount: number
  relatedSearch: string[]
  value: ArticleContent[]
}

export interface ArticleDefault {
  values: ArticleContent[]
}

export interface ArticleContent {
  id: string
  title: string
  url: string
  description: string
  body: string
  datePublished: string
  image: Image
  provider: Provider
}

export interface Image {
  url: string
  width: number
}

interface Provider {
  name: string
}
