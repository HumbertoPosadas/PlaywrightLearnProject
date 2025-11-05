import { test, expect } from '@playwright/test';

//Une soft assertion permet de continuer l'execution du test meme si une assertion echoue, 
// ar exemple pour verifier plusieurs elements d'une page web si une assertion echoue, les autres assertions seront quand meme verifiees.

test.describe('Soft assertions pour les checkboxes', () => {
    test.skip('Les assertions doivent continuer même si une échoue', async ({ page }) => {

        await test.step('Je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })
        
        await test.step('Je valide que tous les elements textboxes sont visibles', async () => {
            await expect.soft(page.getByText('Burrito 🌯'), 'L\'élément Burrito 🌯 n\'est pas visible').toBeVisible();
            await expect.soft(page.getByText('Pizza 🍕'), 'L\'élément Pizza 🍕 n\'est pas visible').toBeVisible();
            await expect.soft(page.getByText('Pasta 🍝'), 'L\'élément Pasta 🍝 n\'est pas visible').toBeVisible();
            await expect.soft(page.getByText('Sushi 🍣'), 'L\'élément Sushi 🍣 n\'est pas visible').toBeVisible();
            await expect.soft(page.getByText('Helado 🍧'), 'L\'élément Helado 🍧 n\'est pas visible').toBeVisible();
            await expect.soft(page.getByText('Torta 🍰'), 'L\'élément Torta 🍰 n\'est pas visible').toBeVisible();
        })
        
    })
    
})


