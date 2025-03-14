const getForm = document.getElementById('get-form');
const postForm = document.getElementById('post-form');
const putForm = document.getElementById('put-form');
const deleteForm = document.getElementById('delete-form');

const output = document.getElementById('output');

getForm.addEventListener('submit', async event => {
    event.preventDefault();
    const endpoint = document.getElementById('get-endpoint').value;
    
    const response = await fetch(`http://localhost:4001/api` + endpoint);

    if (!response.ok){
        console.log(response)
        output.innerHTML = `THERE WAS AN ERROR <br> ${response.status}: ${response.statusText}`;
        return;
    }

    const result = await response.json();

    output.innerHTML = ('<pre>' + JSON.stringify(result, null, 2) + '<pre>');
});

postForm.addEventListener('submit', async event => {
    event.preventDefault();
    const endpoint = document.getElementById('post-endpoint').value;
    const name = document.getElementById('post-name').value;
    const amount = document.getElementById('post-amount').value;
    const units = document.getElementById('post-units').value;
    const kcal = document.getElementById('post-kcal').value;
    const foodId = document.getElementById('post-food-id').value;
    const date_consumed = document.getElementById('post-date-consumed').value;
    
    const response = await fetch(`http://localhost:4001/api` + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            amount: amount, 
            units: units,
            kcal: kcal,
            foodId: foodId,
            dateConsumed: dateConsumed
        })
    });

    console.log(response);
    if (!response.ok){
        output.innerHTML = `THERE WAS AN ERROR <br> ${response.status}: ${response.statusText}`;
        return;
    }
    
    const result = await response.json();

    output.innerHTML = ('<pre>' + JSON.stringify(result, null, 2) + '<pre>');
});

putForm.addEventListener('submit', async event => {
    event.preventDefault();
    const endpoint = document.getElementById('put-endpoint').value;
    const name = document.getElementById('put-name').value;
    const amount = document.getElementById('put-amount').value;
    const units = document.getElementById('put-units').value;
    const kcal = document.getElementById('put-kcal').value;
    const foodId = document.getElementById('put-food-id').value;
    const date_consumed = document.getElementById('put-date-consumed').value;
    
    const response = await fetch(`http://localhost:4001/api` + endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            amount: amount, 
            units: units,
            kcal: kcal,
            foodId: foodId,
            dateConsumed: date_consumed
        })
    });

    if (!response.ok){
        console.log(response)
        output.innerHTML = `THERE WAS AN ERROR <br> ${response.status}: ${response.statusText}`;
        return;
    }

    const result = await response.json();

    output.innerHTML = ('<pre>' + JSON.stringify(result, null, 2) + '<pre>');
});

deleteForm.addEventListener('submit', async event => {
    event.preventDefault();
    const endpoint = document.getElementById('delete-endpoint').value;
    
    const response = await fetch(`http://localhost:4001/api` + endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok){
        console.log(response)
        output.innerHTML = `THERE WAS AN ERROR <br> ${response.status}: ${response.statusText}`;
        return;
    }

    output.innerHTML = 'Food item deleted!';
});