import React, { memo, useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import { createMarkup } from '../services/utils'
import { ArticleContent, Image } from '../types/article'
import { useRouter } from 'next/router'

const World = (values: ArticleContent[]) => {
  const history = useRouter()
  const subject = 'world'
  const [articles, setArticles] = useState<ArticleContent[]>([])

  useEffect(() => {
    setArticles(Object.values(values))
  }, [])

  const renderImage = (image: Image, description: string) => (
    <img src={image.url} alt={description} width="100%" />
  )

  const openPost = (id: string) => history.push(`/${subject}/${id}`)

  const renderPost = (post: ArticleContent, index: number) => {
    const { title, description, image, id } = post
    const spanValue = index === 0 ? 24 : 12

    return (
      <Col span={spanValue} key={`post-${index}`}>
        <article onClick={() => openPost(id)}>
          <div>
            <p>
              <strong dangerouslySetInnerHTML={createMarkup(title)}></strong>
            </p>
            {index === 0 && renderImage(image, description)}
          </div>
        </article>
      </Col>
    )
  }
  return (
    <>
      <Row gutter={[12, 12]}>{articles.map(renderPost)}</Row>
    </>
  )
}

export default memo(World)
