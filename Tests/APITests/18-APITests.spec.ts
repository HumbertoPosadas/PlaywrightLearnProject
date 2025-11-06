import {  test, expect } from '@playwright/test';

const REPO = 'PlaywrightLearnProject'
const USER = 'HumbertoPosadas'

test.describe('Tests API GitHub', () => {

test('Je suis capable de creer un bug (issue) sur mon repo', async ({ request }) => {
   
    const newBug = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[BUG] Mon deuxieme bug cree via API',
            body: 'Details du bug a corriger 2'
        }
    })
    expect(newBug.ok()).toBeTruthy()    // Verifier que la reponse est correcte.
    expect(newBug.status()).toBe(201)   // Verifier que la reponse est correcte. code 201

    //attente de 15 secondes pour la creation de l'issue
    await new Promise(f => setTimeout(f, 15000));

    const dataList = await request.get(`/repos/${USER}/${REPO}/issues`)
    expect(dataList.ok()).toBeTruthy()  // Verifier que la reponse est correcte.
    console.log(await dataList.json())
    
    expect(await dataList.json()).toContainEqual(
        expect.objectContaining({
            title: '[BUG] Mon deuxieme bug cree via API',
            body: 'Details du bug a corriger 2'
        })
    )

})

}); 


