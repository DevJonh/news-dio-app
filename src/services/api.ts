const params = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

const URL = 'https://api-news-dio.herokuapp.com/api'

export const getNews = async (subject: string) => {
  return await fetch(`${URL}/${subject}`, params)
    .then((res) => res.json())
    .catch((err) => console.error('Ocorreu um Erro: ', err))
}

export const getNewsById = async (subject: string, id: string) => {
  return await fetch(`${URL}/${subject}/${id}`, params)
    .then((response) => response.json())
    .catch((err) => {
      console.error('Ocorreu um Erro: ', err)
    })
}
