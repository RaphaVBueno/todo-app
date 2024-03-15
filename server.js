import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'

const server = createServer(async (req, res) => {
  console.log(req.method, req.url)
  const html = await readFile('./primeiro_site.html')
  res.writeHead(200, {
    'content-type': 'text/html',
  })
  res.write(html)
  res.end
})

const port = 3000

server.listen(port, () => {
  console.log('servidor rodando em http://localhost:' + port)
})
