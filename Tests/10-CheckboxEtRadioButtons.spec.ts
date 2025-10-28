import { test, expect} from '@playwright/test';

test.describe('Actions dans le Sandbox Automation', () => {
    test('Selectionner checkboxes', async ({ page }) => {
        await test.step('tant que je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Je suis capable de selectionner le checkbox Pasta', async () => {
            await page.getByRole('checkbox', { name: 'Pasta 🍝' }).check()
            await page.getByRole('checkbox', { name: 'Torta 🍰' }).check()
            //faire un wait de 5 secondes pour voir l'action
            await page.waitForTimeout(5000);
            await page.getByLabel('Pasta 🍝').uncheck()
        })
    })

    test('Selectionner Radio Buttons', async ({ page }) => {
        await test.step('tant que je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Je suis capable de selectionner un seul radio button', async () => {
            await page.getByLabel('Si').check();
            //faire un wait de 5 secondes pour voir l'action
            await page.waitForTimeout(5000);
            await page.getByRole('radio', { name: 'No' }).check();
        })
        
    })
    
    
})
