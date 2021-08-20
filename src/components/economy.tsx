import React, { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Row, Col } from 'antd'
import { createMarkup } from '../services/utils'
import { ArticleContent, Image } from '../types/article'

const Economy = (values: ArticleContent[]) => {
  const history = useRouter()
  const subject = 'economy'
  const [articles, setArticles] = useState<ArticleContent[]>([])

  useEffect(() => {
    setArticles(Object.values(values))
  }, [])

  const renderImage = (image: Image, description: string) => (
    <img src={image.url} alt={description} width="100%" />
  )

  const renderDescription = (description: string) => (
    <p dangerouslySetInnerHTML={createMarkup(description)}></p>
  )

  const openPost = (id: string) => history.push(`/${subject}/${id}`)

  const renderPost = (post: ArticleContent, index: number) => {
    const { title, description, image, id } = post
    return (
      <Col span={24} md={12} key={`post-${index}`}>
        <article onClick={() => openPost(id)}>
          <div>
            <p>
              <strong dangerouslySetInnerHTML={createMarkup(title)}></strong>
            </p>
            {image?.url
              ? renderImage(image, description)
              : renderDescription(description)}
          </div>
        </article>
      </Col>
    )
  }
  return (
    <>
      <Row gutter={[12, 12]}>{articles?.map(renderPost)}</Row>
    </>
  )
}

export default memo(Economy)
