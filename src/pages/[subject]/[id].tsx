import { Col, Row } from 'antd'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { memo, useEffect, useState } from 'react'
import { getNews, getNewsById } from '../../services/api'
import { createMarkup } from '../../services/utils'
import { ArticleContent, Image } from '../../types/article'

interface PostContent {
  post: ArticleContent
  news: ArticleContent[]
}

const URL = 'https://api-news-dio.herokuapp.com/api'

const Post = ({ post, news }: PostContent) => {
  const [renderActions, setRenderActions] = useState<() => JSX.Element>()
  const history = useRouter()
  const router = useRouter()
  const actions =
    router.query.subject && !Array.isArray(router.query.subject)
      ? router.query.subject
      : ''

  const ShareIcon = '/images/share.svg'
  const CopyIcon = '/images/copy.svg'

  useEffect(() => {
    const shareInfo = async () =>
      await window.navigator.share({
        title: `PWA News - ${actions}`,
        text: post.title,
        url: URL
      })

    const copyInfo = async () =>
      await window.navigator.clipboard.writeText(
        `${post.title} - *Learn more about in* ${URL}/${actions}/${post.id}`
      )

    const renderActions = () => {
      const action = window.navigator.userAgent.match(/webOS/i)
        ? shareInfo
        : copyInfo
      const icon = window.navigator.userAgent.match(/webOS/i)
        ? ShareIcon
        : CopyIcon

      return (
        <img alt="icon" src={icon} className="share-icon" onClick={action} />
      )
    }
    setRenderActions(renderActions)
  }, [])

  const renderImage = (image: Image, description: string) => (
    <img src={image.url} alt={description} width="100%" />
  )

  const openPost = (id: string) => history.push(`/technology/${id}`)

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
    <div>
      <Link href="/">
        <a>Back</a>
      </Link>
      <div className="share">{renderActions}</div>
      <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
          <p>{post.datePublished}</p>
          <h1 dangerouslySetInnerHTML={createMarkup(post.title)}></h1>
          {post.image && (
            <img src={post.image.url} alt={post.description} width="75%" />
          )}

          <p
            className="text"
            dangerouslySetInnerHTML={createMarkup(post.description)}
          ></p>
          <hr />
          <div
            className="text"
            dangerouslySetInnerHTML={createMarkup(post.body)}
          ></div>
          <hr />

          <Col span={24} md={12}>
            <Row gutter={[16, 16]}>{news.map(renderPost)}</Row>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default memo(Post)

export const getStaticPaths = async () => {
  const dataWorld: ArticleContent[] = await getNews('world').then(
    (res) => res.value
  )
  const dataEconomy: ArticleContent[] = await getNews('economy').then(
    (res) => res.value
  )
  const dataTechnology: ArticleContent[] = await getNews('technology').then(
    (res) => res.value
  )

  let paths: any[] = []

  const pathsWorld = dataWorld.map(({ id }) => ({
    params: { subject: 'world', id }
  }))
  const pathsEconomy = dataEconomy.map(({ id }) => ({
    params: { subject: 'economy', id }
  }))
  const pathsTechnology = dataTechnology.map(({ id }) => ({
    params: { subject: 'technology', id }
  }))

  paths = paths.concat(pathsWorld).concat(pathsEconomy).concat(pathsTechnology)

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const subject = params?.subject
  const id = params?.id

  if (!subject || !id || Array.isArray(subject) || Array.isArray(id)) {
    return { notFound: true }
  }

  const post: ArticleContent = await getNewsById(subject, id).then((res) => res)
  const news: ArticleContent[] = await getNews(subject)
    .then((res) => res.value)
    .then((res) => res.filter((item: ArticleContent) => item.id !== id))

  if (!post) return { notFound: true }

  return {
    revalidate: 60,
    props: {
      post,
      news
    }
  }
}
