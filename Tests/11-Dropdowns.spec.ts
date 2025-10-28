import { test, expect} from '@playwright/test';

test.describe('Actions dans le Sandbox Automation', () => {
    test('Selection dans un Dropdown Sport', async ({ page }) => {
        await test.step('tant que je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        //Dropdown du type Select HTML
        await test.step('Je selectione un sport dans le Dropdown', async () => {
            await page.getByLabel('Dropdown').selectOption('Tennis');
        })
    })   

    test('Selection dans un Dropdown Jour de la semaine', async ({ page }) => {
        await test.step('tant que je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        //Dropdown du type custom (dans mon cas un bouton qui affiche une liste d'elements apres avoir clique dessus)
        await test.step('Je selectionne un jour de la semaine dans le Dropdown', async () => {
            //je clique d'abord sur le bouton pour afficher les options
            await page.getByRole('button', { name: 'Día de la semana' }).click();
            //puis je clique sur l'option que je veux selectionner
            await page.getByRole('link', { name: 'Jueves' }).click();
        })
    })
    
})
