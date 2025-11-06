/*
Ce test API va créer un repository vide avant de lancer les tests
en suite il va créer une issue (bug) dans ce repository
apres il va verifier les details de cette issue
a la fin je vais modifier le issue pour la clore (close)
je supprime le repository créé pour pouvoir relancer le test sans conflit
*/
import { test, expect } from '@playwright/test';

const REPO = 'APITestsPlaywright'
const USER = 'HumbertoPosadas'

//toujours avant de lancer mes tests, je vais créer un repository vide sur mon compte GitHub
test.beforeAll(async ({ request }) => {
    const response = await request.post('/user/repos', {
        data: {
            name: REPO,
        }
    });
    console.log(response.status.toString);
    expect(response.ok()).toBeTruthy();
});



test.describe('Tests CRUD API GitHub', () => {
    test('Je suis capable de creer mon issue dans mon repo', async ({ request }) => {
        
        const response = await request.post(`/repos/${USER}/${REPO}/issues`, {
            data: {
                title: '[BUG] Nothings works until i play Gangnam style',
                body: 'Ooooopah Gangnam style!'
            }
        });
        console.log(response.status);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);
        
       
    })

    test('Je peux visualiser la liste de issues dans mon repo', async ({ request }) => {
        const response = await request.get(`/repos/${USER}/${REPO}/issues`);
        expect(response.ok()).toBeTruthy();
        console.log(await response.json());
        expect(await response.json()).toContainEqual(
            expect.objectContaining({
                title: '[BUG] Nothings works until i play Gangnam style',
                body: 'Ooooopah Gangnam style!'
            })
        )
        console.log(response.status);
    })

    test('Je suis capable de clore mon issue', async ({ request }) => {
        //d'abord je dois recuperer le numero de mon issue
        const issuesList = await request.get(`/repos/${USER}/${REPO}/issues`);
        expect(issuesList.ok()).toBeTruthy();
        const issues = await issuesList.json();
        const issueNumber = issues[0].number;

        //ensuite je peux clore mon issue via son numero
        const closeIssue = await request.patch(`/repos/${USER}/${REPO}/issues/${issueNumber}`, {
            data: {
                state: 'closed'
            }
        });
        expect(closeIssue.ok()).toBeTruthy();
        const closedIssue = await closeIssue.json();
        expect(closedIssue.state).toBe('closed');

        // Je recupere a nouveau a liste de issues pour verifier que mon issue est bien fermee
        const updatedIssuesList = await request.get(`/repos/${USER}/${REPO}/issues`);
        expect(updatedIssuesList.ok()).toBeTruthy();
        const updatedIssues = await updatedIssuesList.json();
        expect(updatedIssues).toEqual([]); //la liste doit etre vide car l'unique issue est fermee
    })
});


//apres mes tests, je supprime le repository créé
test.afterAll(async ({ request }) => {
    const response = await request.delete(`/repos/${USER}/${REPO}`);
    console.log(response.status);
    expect(response.ok()).toBeTruthy();
    
});
