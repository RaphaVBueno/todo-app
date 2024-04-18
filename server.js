import express from 'express'
import fs, { readFile } from 'fs'
import postgres from 'postgres'

const sql = postgres(process.env.DB)

const app = express()
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static('public'))

const port = 3001

app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:' + port)
})

const getDados = async () => {
  const data = await sql`
 SELECT * FROM tasks; 
  `
  return data
}

const uptadeDados = async (title, user = 'rapha@mail.com') => {
  await sql`
INSERT INTO tasks (title, status, date, user_email) VALUES (
  ${title},
  FALSE,
  CURRENT_DATE,
  ${user}
  );
`
}

const updateStatus = async (title) => {
  await sql`
  UPDATE tasks SET status = false WHERE title = ${title};`
}

//app.post('/updateStatus', async (req, res) => {
//console.log(req.body)
//const { title } = req.body
//try {
//await sql`
//UPDATE tasks SET status = false WHERE title = ${title};
//res.json({ success: true })
//} catch (err) {
//console.error(err)
//res.json({ success: false })
//}
//})

app.post('/updateStatus', async (req, res) => {
  const status = updateStatus()
  res.redirect('back')
})

app.get('/dados', async (req, res) => {
  const dados = await getDados()
  res.send(dados)
})

app.post('/add-tarefa', async (req, res) => {
  await uptadeDados(req.body.title)
  res.redirect('back')
})

function ler() {
  const arquivo = fs.readFileSync('public/dados.json')
  const dados = JSON.parse(arquivo)
  return dados
}
