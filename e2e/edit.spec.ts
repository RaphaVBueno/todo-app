import { test, expect } from '@playwright/test'

test('Jornada - edição da tarefa', async ({ page, browserName }) => {
  const taskName = `jogar ps2 ${browserName}`
  await page.goto('http://localhost:5173/')
  //---
  // Act (Create) - Adicionei uma tarefa
  await page.getByRole('button', { name: 'Adicionar tarefa' }).click()
  await page.getByLabel('Título da tarefa').fill(taskName)
  await page.getByRole('button', { name: 'Salvar' }).click()
  // Assert (Read) - Verifiquei se a tarefa está visível
  await expect(page.getByText(taskName)).toBeVisible()

  await page
    .locator('li')
    .filter({ hasText: taskName })
    .getByLabel('edit')
    .click()
  await page.getByLabel('Título da tarefa').click()

  await page.getByLabel('Título da tarefa').fill(`jogar ps3 ${browserName}`)
  await page.getByLabel('Descrição').click()
  await page.getByLabel('Descrição').fill(`teste desc ${browserName}`)
  await page.getByRole('button', { name: 'Confirmar' }).click()
  await expect(page.getByText(`jogar ps3 ${browserName}`)).toBeVisible()
  await expect(
    page.getByText(`/09/2024: teste desc ${browserName}`)
  ).toBeVisible()
  await page
    .locator('li')
    .filter({ hasText: taskName })
    .getByLabel('delete')
    .click()

  await expect(page.getByText(taskName)).not.toBeVisible()
})
