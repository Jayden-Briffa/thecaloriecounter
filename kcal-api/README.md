# Calorie-Tracker
---
## General information
This is the backend to my calorie counting application. It has been made with node, Express, and sqlite to facilitate CRUD operations related to foods and foods consumed by users

A 'public' folder is included to test the API's basic functionality with simple forms

---
## Functionality
+ Be able to store information about items consumed
+ Calculate calories consumed in a day based on items consumed
+ Allow user to enter new items to facilitate automatic calori calculation
+ Allow user to see statistics of calories consumed

## Endpoints --- /api
### Foods --- /foods
+ GET /
    Returns all foods
+ GET /:foodId
    Returns the food with the given ID
+ POST /
    Creates a new food and returns it
+ PUT /:foodId
    Updates the food with the given ID and returns it
+ DELETE /:foodId
    Deletes the food with the given ID

### Consumed foods --- /consumed
+ GET /
    Returns all consumed food logs
+ GET /:consumedId
    Returns the consumed food log with the given ID
+ POST /
    Creates a new consumed food log
+ PUT /:consumedId
    Updates the consumed food log with the given ID and returns it
+ DELETE /:consumedId
    Deletes the consumed food log with the given ID