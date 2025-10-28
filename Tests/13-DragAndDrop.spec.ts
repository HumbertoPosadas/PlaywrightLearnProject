import { test, expect} from '@playwright/test';

test.describe('Faire Drag and Drop', () => {
    test('Je suis capable de faire drag and Drop des elements en Automation Sandbox', async ({ page }) => {
        await test.step('tant que je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('', async () => {
            await page.getByTestId('draggable-item-1').dragTo(page.getByTestId('droppable-area'));
        })
        
        
    })
    
})
