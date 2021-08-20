import React, { memo, useState, useEffect } from 'react'
import { Row, Col } from 'antd'

import { getNews } from '../services/api'
import Economy from '../components/economy'
import World from '../components/world'
import Technology from '../components/technology'
import { News } from '../types/news'
import { GetStaticProps } from 'next'
import { Article } from '../types/article'

interface Home {
  news: News
}

const Home = ({ news }: Home) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
          <h2>World</h2>
          <World {...news?.world} />
        </Col>
        <Col span={24} md={8}>
          <h2>Economy</h2>
          <Economy {...news?.economy} />
        </Col>
      </Row>
      <hr />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2>Technology</h2>
          <Technology {...news?.technology} />
        </Col>
      </Row>
    </div>
  )
}

export default memo(Home)

export const getStaticProps: GetStaticProps = async () => {
  const world: Article = await getNews('world')
  const economy: Article = await getNews('economy')
  const technology: Article = await getNews('technology')

  const news: News = {
    world: world.value,
    economy: economy.value,
    technology: technology.value
  }

  return {
    props: {
      news
    }
  }
}
