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

# Endpoints --- /api
## Users --- /auth
### GET /user
Returns the email of the logged-in user, or null if they are not logged in {user: {email: ...}} OR {user: null}

Use this to verify if the user is logged in

### POST /signup
Creates a new user account and returns an access token

The following values should be provided in the request body:
| Value name | Description | Example | Requirement |
| ---- | ---- | ---- | ---- |
| email | User's email used to login | 'example@email.com' | required |
| password | User's password used to login | 'example123' | required |

### POST /login
Finds a user and returns an access token

The following values should be provided in the request body:
| Value name | Description | Example | Requirement |
| ---- | ---- | ---- | ---- |
| email | User's email used to login | 'example@email.com' | required |
| password | User's password used to login | 'example123' | required |

### DELETE /user
Deletes all data associated with the logged-in user

## Foods --- /foods
### GET /

Returns all foods {Foods: ...}

Takes the following query parameters
| Parameter name | Description | Example | Requirement | Returns |
| ---- | ---- | ---- | ---- | ---- |
| orderedBy | Order foods by any field | ?orderedBy=name | Optional | {Foods: ...}
| foodIds | Only include foods with any of the given id's | ?foodIds=1,2,3 | Optional | {Foods: ...}

### GET /:foodId
    
Returns the food with the given ID {Food: ...}

### POST / 

Creates a new food and returns it {Food: ...}

The following values should be provided in the request body:
| Value name | Description | Example | Requirement |
| ---- | ---- | ---- | ---- |
| name | Name of the new food | 'apple' | required |
| quantity | How many units of the food are being considered | '100' | required |
| units | Units used to measure the food | 'grams' | required |
| kcal | Number of calories per quantity of units | '75' | required |

### PUT /:foodId
Updates the food with the given ID and returns it {Food: ...}

The following values should be provided in the request body:
| Value name | Description | Example | Requirement |
| ---- | ---- | ---- | ---- |
| name | New name of the food | 'apple' | required |
| quantity | New quantity being considered | '100' | required |
| units | New units for the food | 'grams' | required |
| kcal | New number of calories per quanitity of units | '75' | required |

### DELETE /:foodId
Deletes the food with the given ID


## Consumed foods --- /consumed
### GET /
Returns all consumed food logs {Consumed_Foods: ...}

### GET /:consumedId
Returns the consumed food log with the given ID {Consumed_Food...}

### POST /
Creates a new consumed food log and returns it {Consumed_Food: ...}

The kcal count should be calculated using data from /Foods to reduce unnecessary API calls.

The following values should be provided in the request body:
| Value name | Description | Example | Requirement |
| ---- | ---- | ---- | ---- |
| foodId | The food's id from /Foods |  '1' | required |
| quantity | The number of units consumed of the food | '100' | required |
| kcal | The number of calories consumed | '75' | required |
| dateConsumed | When the food was consumed | '2025-04-08' | required |

### PUT /:consumedId
Updates the consumed food log with the given ID and returns it {Consumed_Food: ...}

The following values should be provided in the request body:
| Value name | Description | Example | Requirement |
| ---- | ---- | ---- | ---- |
| quantity | New number of units consumed | '120' | required |
| kcal | New number of calories consumed | '90' | required |

### DELETE /:consumedId
Deletes the consumed food log with the given ID

## Kcal logs --- /kcal
### GET /
Returns all calorie logs {Logs: ...}

Takes the following query parameters
| Parameter name | Description | Example | Requirement | Returns |
| ---- | ---- | ---- | ---- | ---- |
| date | Only include logs created on a specific date | ?date=2025-03-15 | Optional | {Log: ...}
| start | Only include logs after or on the date | ?start=2025-03-15 | Optional (required when using end) | {Logs: ...}
| end | Only include logs before or on the date | ?end=2025-03-20 | Optional (required when using start) | {Logs: ...}
| getAvg | Return an average of calorie logs | getAvg=true | Optional |{Kcal: ...}

### GET /:logId
Returns the calorie log with the given ID {Log: ...}

### POST /
Creates a new calorie log and returns it {Log: ...}

The following values should be provided in the request body:
| Value name | Description | Example | Requirement |
| ---- | ---- | ---- | ---- |
| kcal | Number of kcal consumed that day | '1980' | required |
| date | Date of the kcal log | '2025-03-15' | required |

### PUT /:logId
Updates the calorie log with the given ID and returns it {Log: ...}

The following values should be provided in the request body:
| Value name | Description | Example | Requirement |
| ---- | ---- | ---- | ---- |
| kcal | New number of calories consumed that day | '2010' | required |

### DELETE /:logId
Deletes the consumed food log with the given ID

# Package commands
| Command | Description | Example |
| ---- | ---- | ---- |
| start | Start the server | npm start |
| dev | Start the server with HMR | npm run dev |
| resetdb | Replace the database with contents of db_current.sql | npm run resetdb |
| restart | Reset database with restart server with HMR | npm run restart |