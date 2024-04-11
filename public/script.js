const tarefas = document.querySelector('#tarefas')

function createTarefa(tarefa) {
  const div = document.createElement('div')
  div.classList.add('todo-list')
  const label = document.createElement('label')
  const input = document.createElement('input')
  const text = document.createTextNode(tarefa.tarefa)
  input.setAttribute('type', 'checkbox')
  label.appendChild(input)
  label.appendChild(text)
  div.appendChild(label)
  tarefas.appendChild(div)

  input.addEventListener('change', function () {
    if (this.checked) {
      tarefa.status = true

      const novaDiv = document.querySelector('#tarefas-concluidas')
      novaDiv.appendChild(div)
    } else {
      tarefa.status = false

      tarefas.appendChild(div)
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
