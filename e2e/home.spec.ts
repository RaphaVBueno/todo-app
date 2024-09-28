import { test, expect } from '@playwright/test'
// Arrange (preparar), Act (agir), Assert (verificar)
test('Jornada - CRUD tarefa', async ({ page, browserName }) => {
  // Arrange - configurar stubs de teste e ir para a página a ser testada
  const taskName = `jogar astrobot ${browserName}`
  await page.goto('http://localhost:5173/')
  //---
  // Act (Create) - Adicionei uma tarefa
  await page.getByRole('button', { name: 'Adicionar tarefa' }).click()
  await page.getByLabel('Título da tarefa').fill(taskName)
  await page.getByRole('button', { name: 'Salvar' }).click()
  // Assert (Read) - Verifiquei se a tarefa está visível
  await expect(page.getByText(taskName)).toBeVisible()
  const checkbox = await page
    .locator('li')
    .filter({ hasText: ` ${taskName}` })
    .locator('input[type="checkbox"]')
  await expect(checkbox).not.toBeChecked()

  // await expect()... verificar se a tarefa está marcada como feita ou não - padrão não marcado
  // ---
  // Act (Update) - Marcar a tarefa como feita
  await page.getByText(taskName).click()
  // Assert - Tarefa marcada como feita
  await expect(checkbox).toBeChecked()

  const taskText = page
    .locator('li')
    .filter({ hasText: taskName })
    .locator('span:has-text("' + taskName + '")')

  //await expect(taskText).toHaveCSS('textDecoration', 'line-through')
  // await expect()... encontrar o localizador da tarefa e de alguma forma verificar se o checkbox está marcado ou não.
  // Adicionalmente, verificar se o texto está sobrescrito
  // Act (Update) - Marcar a tarefa novamente como não feita
  await page.getByText(taskName).click()
  await expect(checkbox).not.toBeChecked()
  // await expect()... mesmo estado de quando a tarefa foi criada ap
  // ---
  // Act (Delete) - Deletar a tarefa
  await page
    .locator('li')
    .filter({ hasText: taskName })
    .getByLabel('delete')
    .click()
  // Assert - Tarefa não é mais existente na página
  await expect(page.getByText(taskName)).not.toBeVisible()
})
