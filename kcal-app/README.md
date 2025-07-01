# Overview

This is my first real project made with React. It was originally bootstrapped using CRA to solidify my React knowledge and make it easier for me to track my calories. 

I have since moved to Vite for benefits like improved startup time.

Wrangler is used to support SPA performance, largely in allowing users to reload on paths other than '/' and the worker file is therefore very minimalistic.

# Pages

## Dashboard
+ View calories over time in the past selected number of days
+ See average calories in the past selected number of days
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

# Package commands
| Command | Description | Example |
| ---- | ---- | ---- |
| start | Start dev server with HMR | npm start |
| dev | Start dev server with HMR | npm run dev |
| build | Build project with Vite | npm run build |
| preview | View the project in a production-like environment | npm run preview |
| preview:worker | Build project and view in a production-like environment with wrangler active | npm run preview:worker |
| deploy:worker | Build project and deploy to cloudflare | npm run deploy:worker |

# Future developments
| Title | Description |
| ---- | ---- |
| Implement recipes | Allow for users to calculate the calories in a specific recipe and submit that food to MyFoods for longer-term storage |
