import express from 'express'
import fs, { readFile } from 'fs'
import postgres from 'postgres'
import { title } from 'process'

const sql = postgres(process.env.DB)

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', express.static('public'))

const port = 3000

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

const updateStatus = async (title, status) => {
  await sql`
      UPDATE tasks SET status = ${status} WHERE title = ${title};
    `
}

app.post('/updateStatus', async (req, res) => {
  const status = await updateStatus(req.body.title, req.body.status)
  res.json({ message: 'OK' })
})

app.get('/dados', async (req, res) => {
  const dados = await getDados()
  res.send(dados)
})

app.post('/add-tarefa', async (req, res) => {
  await uptadeDados(req.body.title)
  res.redirect('back')
})
