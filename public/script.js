const tarefas = document.querySelector('#tarefas')

function createTarefa(tarefa) {
  const div = document.createElement('div')
  div.classList.add('todo-list')
  const label = document.createElement('label')
  const input = document.createElement('input')
  const text = document.createTextNode(tarefa.title)
  input.setAttribute('type', 'checkbox')
  label.appendChild(input)
  label.appendChild(text)
  div.appendChild(label)
  tarefas.appendChild(div)

  const titulo = tarefa.title
  //criar um form action??
  input.addEventListener('change', async function () {
    const status = this.checked
    console.log(titulo)
    const response = await fetch('/updateStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: titulo }),
    })

    const result = await response.json()

    if (result.success) {
      const novaDiv = document.querySelector('#tarefas-concluidas')
      if (status) {
        novaDiv.appendChild(div)
      } else {
        tarefas.appendChild(div)
      }
    } else {
      console.error('Failed to update status')
    }
  })
}

async function getDados() {
  const response = await fetch('/dados')
  const dados = await response.json()
  dados.forEach(createTarefa)
  console.log(dados)
}

getDados()
