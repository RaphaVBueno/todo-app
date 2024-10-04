import { test, expect } from "@playwright/test";

// Arrange (preparar), Act (agir), Assert (verificar)
test("Jornada - CRUD tarefa", async ({ page, browserName }) => {
  // Arrange - configurar stubs de teste e ir para a página a ser testada
  const taskName = `jogar astrobot ${browserName}`;
  await page.goto("http://localhost:5173/");

  // Act (Create) - Adicionei uma tarefa
  await page.getByRole("button", { name: "Adicionar tarefa" }).click();
  await page.getByLabel("Título da tarefa").fill(taskName);
  await page.getByRole("button", { name: "Salvar" }).click();

  // Assert (Read) - Verifiquei se a tarefa está visível
  await expect(page.getByText(taskName)).toBeVisible();

  const checkbox = await page
    .locator("li")
    .filter({ hasText: ` ${taskName}` })
    .locator('input[type="checkbox"]');

  await expect(checkbox).not.toBeChecked(); // Verificar que a tarefa inicialmente não está marcada

  // Act (Update) - Marcar a tarefa como feita
  await page.getByText(taskName).click();

  // Assert - Tarefa marcada como feita
  await expect(checkbox).toBeChecked();

  // Act (Update) - Marcar a tarefa novamente como não feita
  await page.getByText(taskName).click();

  // Assert - Tarefa deve estar desmarcada
  await expect(checkbox).not.toBeChecked();

  // Act (Buscar) - Escrever o nome da task no campo de busca (OutlinedInput)
  const searchInput = page.locator('input[placeholder="Buscar..."]');
  await searchInput.fill(taskName);

  // Assert (Buscar) - Verificar se a tarefa está visível após a busca
  await expect(page.getByText(taskName)).toBeVisible();

  // Act (Delete) - Deletar a tarefa
  await page
    .locator("li")
    .filter({ hasText: taskName })
    .getByLabel("delete")
    .click();

  // Assert - Tarefa não é mais existente na página
  await expect(page.getByText(taskName)).not.toBeVisible();
});
