const tarefas = document.querySelector('#tarefas')
const tarefasConcluidas = document.querySelector('#tarefas-concluidas')

function createTarefa(tarefa) {
  const div = document.createElement('div')
  div.classList.add('todo-list')
  const label = document.createElement('label')
  const input = document.createElement('input')
  const text = document.createTextNode(tarefa.title)
  input.setAttribute('type', 'checkbox')
  input.checked = tarefa.status

  input.addEventListener('change', function () {
    const status = this.checked
    fetch('/updateStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: tarefa.title, status }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (status) {
          tarefasConcluidas.appendChild(div)
        } else {
          tarefas.appendChild(div)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  })

  label.appendChild(input)
  label.appendChild(text)
  div.appendChild(label)
  return div
}

function renderTarefas(tarefasData) {
  for (const tarefa of tarefasData) {
    const tarefaElement = createTarefa(tarefa)
    if (tarefa.status) {
      tarefasConcluidas.appendChild(tarefaElement)
    } else {
      tarefas.appendChild(tarefaElement)
    }
  }
}

fetch('/dados')
  .then((response) => response.json())
  .then(renderTarefas)
  .catch((error) => {
    console.error('Error:', error)
  })

async function getDados() {
  const response = await fetch('/dados')
  const dados = await response.json()
  dados.forEach(createTarefa)
  console.log(dados)
}

getDados()
