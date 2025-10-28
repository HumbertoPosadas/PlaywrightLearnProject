import { test, expect} from '@playwright/test';

test.describe('Simulation upload files', () => {
    test('Je peux telecharger des fichiers', async ({ page }) => {
        await test.step('tant que je navigue vers le Sandbox automation', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Je rajoute mes fichiers dans la modale', async () => {
            //Selectionner les fichiers a uploader
            await page.getByLabel('Upload files').setInputFiles([
                {
                    name: 'test-file.txt',
                    mimeType: 'text/plain',
                    buffer: Buffer.from('Ceci est un fichier de test')
                },
                {
                    name: 'image-test.png',
                    mimeType: 'image/png',
                    buffer: Buffer.from('Ceci est une image de test')
                }
            ]);
            //deselectionner les fichiers precedents
            await page.getByLabel('Upload files').setInputFiles([]);

            
        })
        
        
    })
    
})
