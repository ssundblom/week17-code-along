import express, { request, response } from 'express'
import csvtojson from 'csvtojson'

const csvFilePath = 'cwurData.csv'
const ERROR_NOT_FOUND = { error: 'Nothing to be found' }

let rankings = []
csvtojson()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    rankings = jsonObj
    console.log(jsonObj.length)
  })

const app = express()

app.get('/', (req, res) => {
  res.send('morningmorning!')
})

app.get('/rankings', (req, res) => {
  res.json(rankings)
})

app.get('/rankings/:name', (req, res) => {
  const { name } = req.params
  const filterRankings = rankings.filter((ranking) => ranking.institution === name)
  if (filterRankings.length === 0) {
    res.status(404).json(ERROR_NOT_FOUND)
  } else {
    res.json(filterRankings)
  }
})

app.get('/rankings/:year/ranks/:rank', (req, res) => {
  const { year, rank } = req.params
  const ranking = rankings.find(ranking =>
    ranking.year === year &&
    ranking.world_rank === rank
  )

  if (!ranking) {
    res.status(404).json(ERROR_NOT_FOUND)
  } else {
    res.json(ranking)
  }
})

app.get('/rankings/:year/universities', (req, res) => {
  const { year } = req.params
  const { country } = req.query

  let filterRankings = rankings

  filterRankings = filteredRankings.filter(
    (ranking) => +ranking.institution === +year)
  
  filterRankings = filteredRankings.filter(
    (ranking) => +ranking.country === country)

  if (filterRankings.length === 0) {
    res.status(404).json(ERROR_NOT_FOUND)
  } else {
    res.json(filterRankings)
  }

})



app.listen(8080, () => {
  console.log('morning console!')
}) 