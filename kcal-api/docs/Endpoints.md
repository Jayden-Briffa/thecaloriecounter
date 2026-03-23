
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


## Recipes --- /recipe

### GET /
Returns all recipes owned by the logged-in user.

Query parameters:
| Parameter name | Description | Example | Requirement |
| ---- | ---- | ---- | ---- |
| ids | Only include recipes with any of the given IDs | ?ids=1,2,3 | Optional |
| orderedBy | Order recipes by a specific field | ?orderedBy=name | Optional |

Errors:
- 400 Cannot order by the given field

**Example response:** 200
```json
{
  "Recipes": [
    {
      "id": 1,
      "user_id": 36,
      "name": "my recipe",
      "instructions": "my instructions",
      "measure_quantity": 1,
      "units": "grams",
      "created_at": "2026-01-04T21:39:36.000Z",
      "makes_quantity": 5
    },
    {
      "id": 2,
      "user_id": 36,
      "name": "reci",
      "instructions": null,
      "measure_quantity": null,
      "units": null,
      "created_at": "2026-01-04T22:27:13.000Z",
      "makes_quantity": null
    },
    {
      "id": 3,
      "user_id": 36,
      "name": "Other recipe",
      "instructions": "1. Put together \n2. Bake \n3. Wait 5 minutes to cool",
      "measure_quantity": 1,
      "units": "portions",
      "created_at": "2026-01-04T22:36:59.000Z",
      "makes_quantity": 10
    }
  ]
}
```


### POST /
Creates a new recipe and returns it.

**Request body:**
| Value name | Description | Example | Constraints | Requirement |
| ---- | ---- | ---- | ---- | ---- |
| name | Name of the recipe | "my recipe" | length < 255 | required |
| instructions | Cooking instructions | "my instructions" | | optional |
| measureQuantity | Quantity the recipe is measured by for calculating kcal | 100 | 0 <= x | optional |
| makesQuantity | Quantity the recipe makes | 500 | 0 <= x | optional |
| units | Units used for the recipe's yield | "grams" | length < 255 | optional |

**Errors:**
- 400 Validation failed (invalid or missing values)

**Example response:** 201
```json
{
  "Recipe": {
    "id": 1,
    "user_id": 36,
    "name": "my recipe",
    "instructions": "my instructions",
    "measure_quantity": 100,
    "units": "grams",
    "created_at": "2026-01-04T21:39:36.000Z",
    "makes_quantity": 500
  }
}
```

### PUT /:recipeId
Updates the recipe with the given ID and returns it.

Response:
{ Recipe : ... }

Request body:
| Value name | Description | Example | Requirement |
| ---- | ---- | ---- | ---- |
| name | Updated recipe name | "changed recipe" | required |
| instructions | Updated cooking instructions | "my instructions" | optional |
| measureQuantity | Updated measure quantity | 2 | required |
| makesQuantity | Updated makes quantity | 10 | required |
| units | Updated units | "ounces" | optional |

Errors:
- 400 Validation failed
- 403 Cannot access a recipe you don't own
- 404 Recipe ID not found


### DELETE /:recipeId
Deletes the recipe with the given ID and all associated ingredients.

Errors:
- 403 Cannot access a recipe you don't own
- 404 Recipe ID not found



## Ingredients --- /recipe/:recipeId/ingredient

### GET /
Returns all ingredients associated with the given recipe ID, ordered by sortOrder.

Response:
{ Ingredients : ... }

Errors:
- 403 Cannot access a recipe you don't own
- 404 Cannot find recipe with the given ID


### GET /:ingredientId
Returns the ingredient with the given ID.

Response:
{ Ingredient : ... }

Errors:
- 400 Invalid ID
- 403 Cannot access an ingredient you don't own
- 404 Ingredient ID not found


### POST /
Creates a new ingredient and returns it.

Response:
{ Ingredient : ... }

Request body:
| Value name | Description | Example | Requirement |
| ---- | ---- | ---- | ---- |
| foodId | Related food ID or null | 6 | optional |
| name | Name of the ingredient | "my ingredient" | required |
| quantity | Quantity of the ingredient | 10 | required |
| units | Units for the ingredient | "grams" | optional |
| sortOrder | Display order | 3 | optional |
| ingredientGroup | Ingredient grouping | "filling" | optional |

Errors:
- 400 Validation failed


### PUT /:ingredientId
Updates the ingredient with the given ID and returns it.

Response:
{ Ingredient : ... }

Request body:
| Value name | Description | Example | Requirement |
| ---- | ---- | ---- | ---- |
| foodId | Updated food ID or null | 7 | optional |
| name | Updated ingredient name | "new ingredient" | required |
| quantity | Updated quantity | 2 | required |
| units | Updated units | "" | optional |
| sortOrder | Updated display order | 4 | optional |
| ingredientGroup | Updated grouping | "crust" | optional |

Errors:
- 400 Validation failed
- 403 Cannot access an ingredient you don't own
- 404 Ingredient ID not found


### DELETE /:ingredientId
Deletes the ingredient with the given ID.

Errors:
- 400 Ingredient is not in this recipe
- 403 Cannot access an ingredient you don't own
- 404 Ingredient ID not found
