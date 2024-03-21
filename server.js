import express from 'express'
import { MongoClient } from 'mongodb'

const app = express()
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static('public'))

const port = 3000

const url = 'mongodb://localhost:27017'

const dbname = 'todo-db'

const client = new MongoClient(url)

app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:' + port)
})

app.post('/add-tarefa', async (req, res) => {
  try {
    await client.connect()

    console.log('Conectado com sucesso ao servidor')
    console.log(req.body.tarefa)

    const db = client.db(dbname)

    const collection = db.collection('tarefas')

    const result = await collection.insertOne({ tarefa: req.body.tarefa })

    console.log(`Tarefa inserida com o _id: ${result.insertedId}`)

    res.send('Tarefa: ' + req.body.tarefa + ' adicionada com sucesso!')
  } catch (err) {
    console.error(err)
    res.send('Ocorreu um erro ao adicionar a tarefa')
  } finally {
    await client.close()
  }
})
