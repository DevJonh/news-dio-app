import React, { memo, useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import { createMarkup } from '../services/utils'
import { ArticleContent, Image } from '../types/article'
import { useRouter } from 'next/router'

const Technology = (values: ArticleContent[]) => {
  const history = useRouter()
  const subject = 'technology'
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
    return (
      <Col span={12} md={6} key={`post-${index}`}>
        <article onClick={() => openPost(id)}>
          <div>
            <p>
              <strong dangerouslySetInnerHTML={createMarkup(title)}></strong>
            </p>
            {image.url && renderImage(image, description)}
          </div>
        </article>
      </Col>
    )
  }
  return (
    <>
      <Row gutter={[16, 16]}>{articles?.map(renderPost)}</Row>
    </>
  )
}

export default memo(Technology)
