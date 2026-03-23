# General information
This is the backend to my calorie counting application. It has been made with node, Express, and sqlite to facilitate CRUD operations related to foods and foods consumed by users

A 'public' folder is included to test the API's basic functionality with simple forms

---
# Key functionality
+ Be able to store information about items consumed
+ Calculate calories consumed in a day based on items consumed
+ Allow user to enter new items to facilitate automatic calorie calculation

# Using the login system
After creating an account with the POST /api/auth/signup path (see below), an access token will be generated and returned. This is your key to the API.

Your token should be sent alongside all future requests, otherwise the request will fail because you aren't logged in. Below is an example of a valid request using the token stored in localstorage:

~~~
const response = await fetch(`apidomain.com/api/foods`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
~~~

# Package commands
| Command | Description | Example |
| ---- | ---- | ---- |
| start | Start the server | npm start |
| dev | Start the server with HMR | npm run dev |
| resetdb | Replace the database with contents of db_current.sql | npm run resetdb |
| restart | Reset database with restart server with HMR | npm run restart |