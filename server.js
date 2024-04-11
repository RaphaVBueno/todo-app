import express from 'express'
import fs, { readFile } from 'fs'

const app = express()
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static('public'))

const port = 3000

app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:' + port)
})

app.get('/dados', (req, res) => {
  const dados = ler()
  res.send(dados)
})

app.post('/add-tarefa', (req, res) => {
  const dados = ler()
  dados.push({ ...req.body, status: false })
  fs.writeFileSync('public/dados.json', JSON.stringify(dados))
  res.redirect('back')
})
function ler() {
  const arquivo = fs.readFileSync('public/dados.json')
  const dados = JSON.parse(arquivo)
  return dados
}
