# Family Supper

Family Supper by Meagan Smith: https://family-supper.herokuapp.com

Family Supper is an app where families can preserve and share hand-written recipe cards and memories about family dishes. It is a fullstack React app with with a Redux state manager and a backend using Python, Flask, SQL-Alchemy, and PostgresSQL. 

* Visit the <a href='https://family-supper.herokuapp.com/'>Family Supper</a> App Live
* View the Family Supper <a href='https://github.com/meagan13/Family-Supper/wiki'>Wiki Docs</a>

| Table of Contents |
| ----------------- |
| 1. [Features](#features) |
| 2. [Planning and Database](#planning-and-database)
| 3. [Installation](#installation) |
| 4. [Backend Overview](#backend-overview)
| 5. [Frontend Overview](#frontend-overview)
| 6. [Future Features](#future-features) |
| 7. [Contact Information](#contact-information) |
| 8. [Special Thanks](#special-thanks) |

## Features
### Sign In, Sign Up, and Demo
* **All users** have the option to sign into an existing account or to create an account.
* The **Demo** option gives the user full access to the site without having to create an account or log into the site.

![signin-login-demo](https://user-images.githubusercontent.com/80067572/132060470-d6115ebb-f891-4f6f-bc06-4e0fe84542e1.gif)

### Memories
* **Logged-out users** are able to view all memories shared about specific recipes. They are not able to add, edit, or delete memories.
* **Logged-in users** are also able to create memories from an individual recipe page. Logged-in users are able to edit or delete memories they have posted.

![memory](https://user-images.githubusercontent.com/80067572/132074297-6247d32b-f7d8-4a05-832f-eea04e53457b.gif)

### Recipes
* **Logged-out users** are able to view all recipes posted to the website by all registered users. They are not able to create, edit, or delete recipes.
* **Logged-in users** are also able to create recipes, and users who create recipes can also edit or delete those recipes. 

![recipe](https://user-images.githubusercontent.com/80067572/132074724-e17218b5-9e24-4e4f-9b02-cbba6dde74e3.gif)

### Profile
* **Logged-out users** are not able to view a profile page
* **Logged-in users** are able to view their user information and the recipes that they have posted in their profile.


## Planning and Database
### Database Schema
An image of tables and relationships can be found [here](https://github.com/meagan13/Family-Supper/wiki/Database-Schema). 

### User Stories
Family Supper offers users the opportunity to share family recipes and their memories associated with them. Learn more about the user experience [here](https://github.com/meagan13/Family-Supper/wiki/User-Stories).

### Wireframes
Outlines of each page of Family Supper can be found [here](https://github.com/meagan13/Family-Supper/wiki/Wireframes). 

## Technologies
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=JavaScript&logoColor=333333" /></a>
* <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-336791?logo=PostgreSQL&logoColor=white" /></a>
* <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white"></a>
* <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB"></a>
* <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white"></a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS3-1572B6?logo=CSS3" /></a>
* <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white" /></a>
* <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white" /></a>
* <a href="https://www.heroku.com/home"><img src="https://img.shields.io/badge/Heroku-430098?style=flat&logo=heroku&logoColor=white" /></a>

## Backend Overview
The backend of Family Supper was created using Flask and WTForms. Flask was an ideal choice for its compatibility with the latest technologies, proven performance, and flexibility. WTForms allows for the use of csrfProtection of user data and built-in data validations. 

## Frontend Overview
The frontend of Family Supper was created using React and Redux to provide easy access to data store and state. Redux wraps the state in a store that listens for updates and then updates code that depends on changes in that state. React is beneficial for its ability to create re-usable components.

## Installation
To build/run project locally, please follow these steps:

1. Clone this repository

```shell
git clone https://github.com/meagan13/family-supper.git
```

2. Install Pipfile dependencies and create the virtual environment
```shell
pipenv install
```

2. Install npm dependencies for the `/react-app`

```shell
cd react-app
npm install
```

3. In the `/` root directory, create a `.env` based on the `.env.example` with proper settings

4. Setup your PostgreSQL user, password and database and ensure it matches your `.env` file

5. Before running any flask commands, confirm you are in the pipenv virtual env. If not, run the command:
```shell
pipenv shell
```

5. In the root folder, create the database by running in the terminal:
```shell
flask db create
```

6. In the root folder, migrate tables to the database by running in the terminal:
```shell
flask db migrate
```

7. In the root folder, seed the database by running in the terminal:
```shell
flask seed all
```

8. Start the flask backend in the `/` root directory
```shell
flask run
```

9. Start the frontend in the `/react-app` directory

```javascript
npm start
```

## Highlighted Code Snippets
* next/previous buttons

## Future Features
There are a number of exciting features on the horizon for Family Supper. Please visit again to find:
* **User Profile**: displays a logged-in user's information, including the recipes and memories that they have posted
* **Category Filter**: allows users to selected a specific category and see all recipes classified by that category
* **Edit/Delete Ingredients and Directions**: users will be able to edit or delete the ingredients or directions of a recipe
* **Family Members**: limit access to only members of your family, allowing for more privacy and closer sharing
* **Search Bar**: search for recipes, categories, family member users, and more

## Contact Information
### Meagan Smith
<a href="https://www.linkedin.com/in/meaganhsmith/"><img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_black-512.png" height="38" align="middle" /></a>
<a href="https://github.com/meagan13"><img src="https://image.flaticon.com/icons/png/512/25/25231.png" height="33" align="middle" /></a>
<a href="mailto:meagan.h.smith@gmail.com"><img src="https://img.icons8.com/dotty/80/000000/email.png" height="40" align="middle" /></a>

## Special Thanks
I am forever grateful to the generous and talented community of software engineers who supported me through many coding jams and face-palm moments. I am proud and honored to know you, [Andrew](https://github.com/andru17urdna), [Henry](https://github.com/hnrywltn), [Pierre](https://github.com/TheGuilbotine), [Lema](https://github.com/lemlooma), [Simon](https://github.com/Simonvargas), [Michelle](https://github.com/michellekontoff), [Nico](https://github.com/nicopierson), [John](https://github.com/Jomix-13), [Manna](https://github.com/makon57), [Monte](https://github.com/theflaggship), [Jacob](https://github.com/WellerJay118), [Daniel](https://github.com/danielmay1994), [Jubin](https://github.com/Jubintgh), [Irina](https://github.com/IrinaAmzashvili), [Justice](https://github.com/jujmart), [Torrell](https://github.com/tkenned2020), and [Kagen](https://github.com/KagenLH). 

To my incredible husband and partner in life, Josh Fletcher. Thank you for believing in me, being patient with me, and strongly encouraging me to "go on an' git". You're my favorite.

To my parents, grandparents, and mother-in-law who stand alongside me during my wins and my losses time and time again. Thank you for your love and your example.
