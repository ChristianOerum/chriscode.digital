const private_token = "aZWJnrJHYzQ5e1DqjHHBTUZ2gNst7c5sZRwwN7VdhNQ1"
const grant_token = "vWcBGJ7ELvXXKyurj6tWiAdBpMucWqenPzdfQ4QouEg1"
const url = "https://restapi.e-conomic.com/customers"

async function economicCall() {
await fetch(url, {
    dataType: 'json',
    headers: {
        'X-AppSecretToken': private_token,
        'X-AgreementGrantToken': grant_token,
        'Content-Type': "application/json"
    },
    type: "GET" 
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
}