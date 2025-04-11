# Overview

This is my first real project made with React. It was bootstrapped using CRA to solidify my React knowledge and make it easier for me to track my calories. 

## Commands
+ npm build
+ npm start

# Pages

## Dashboard
+ View calories over time in the past 10 days
+ See average calories in the past 10 days
+ Change how many days before the present are considered and shown

## My Foods
+ Holds all stored foods, which each contain the following attributes:
  + Name
  + Quantity
  + Units
  + Kcal
+ Allows the addition of new foods
+ Allows the deletion of existing foods

## Today's Foods
+ Holds all foods eaten today
+ Each record holds the following information:
  + FoodId (linked to My Foods)
  + Quantity consumed
  + Kcal consumed
+ Allows the addition, creation, and updating of newly-eaten foods
+ Allows the viewing and logging of total calories so far 


# Future developments
| Title | Description |
| ---- | ---- |
| Host the app online | I would like to get the app hosted online (likely through cloudflare) so that I can access the service remotely rather than just at home |
| Implement recipes | Allow for users to calculate the calories in a specific recipe and submit that food to MyFoods for longer-term storage |
| Implement users | Allow multiple users to be registered to the app rather than just me |
