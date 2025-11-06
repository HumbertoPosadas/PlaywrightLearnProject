import { test, expect, APIRequestContext } from '@playwright/test';

const REPO = 'APITestWithPlaywright'
const USER = 'HumbertoPosadas'

//Definition d'une variable apiContext pour reutilisation dans tous les tests
let apiContext: APIRequestContext;

//Je cree un contexte API avant de lancer les tests. Ce contexte sera reutilisable dans tous les tests
test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `Bearer ${process.env.API_TOKEN}`
        }
    });
});

test.describe('Test E2E avec API Test', () => {
    test('Je rajoute un issue par API Request POST', async ({ request }) => {
        const response = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
            data: {
                title: '[BUG] Issue cree via API Request Context 2',
                body: 'Description de l\'issue'
            }
        });
        expect(response.status()).toBe(201);
    // rajouter 15 sec wait pour la creation de l'issue
    await new Promise(f => setTimeout(f, 15000));
    })

    test('Je verifie que mon issue est bien cree via API Request GET', async ({ request }) => {
        
        const response = await apiContext.get(`/repos/${USER}/${REPO}/issues`);
        expect(response.ok()).toBeTruthy();
        const issues = await response.json();
        expect(issues).toContainEqual(
            expect.objectContaining({
                title: '[BUG] Issue cree via API Request Context',
                body: 'Description de l\'issue'
            })
        )
    })

    test('Je verifie la presence de l\'issue dans le repo', async ({ page }) => {
        await page.goto(`https://github.com/${USER}/${REPO}/issues`);
        await expect(page.getByRole('listitem', { name: '[BUG] Issue cree via API Request Context 2' })).toBeVisible();
    })
    
    
})


//Je ferme le contexte API une fois les tests terminés
test.afterAll(async ({  }) => {
    await apiContext.dispose();
})
