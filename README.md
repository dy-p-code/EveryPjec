# Mini Project : Every Project

This code is intended to create a bulletin board to recruit a study or project.
The developer is a team of hanghae-99 for mini-project for frontend and backend collaboration.

# Specification

A compliant README must satisfy all the requirements listed below.

- Note: Standard Readme is designed for open source libraries.
  Also, it was produced based on the library in December 2022.
  If you need information about the library, you can find it in package.json among the included files.

# Modeling / API statement / Wire-Frame

1. Modeling (ERD)
   You can check the modeling by accessing the address below and using an tables. This part was written in the backend.

   https://drawsql.app/teams/dy-1/diagrams/everypjec

2. API Statement
   You can check the API statement by accessing the address below and using an tables. This part was written in the backend.

   https://chiseled-smartphone-11e.notion.site/SA-4-528c06d15d954befa8b9e9ae071f147d

3. Wire-Frame
   You can check the wire-frame by accessing the address below and using an images. This part was written in the frontend.

   https://www.figma.com/file/S8RYtRrMruzWisojrAIHgR/hang99-w5-study?node-id=0%3A1&t=UelR5Lf7WzVehwTb-1

# Table of Contents

The table in the content is shown in the list below.

- Note: This is only a navigation guide for the specification,
  and does not define or mandate terms for any specification-compliant documents.

1. Section
   Main page : Displays some content of the post.
   Login Page : you can login
   sign-up page : You can sign up.
   My Page : Available after login and displays profile photos and brief descriptions of nicknames/technical-stack tags and more.
   Post List page : you can see the view of the post list.
   Create Post Page : you can create a post with details about the project/study recruitment.

2. Additional Features
   Comments - you can create and delete comments.
   picking - You can pick specific posts and then check them in a list.

# Process for Start

1.  Verify that the 'config' folder and the 'config.js' file exist.
    Then, create the '.env' file and fill out the contents below.

    DB_USER='Enter the user's ID of your DB.'
    DB_PASSWORD='Enter the user's password of your DB.'
    DB_NAME=hanghae_mini_project
    DB_END_POINT='Enter the end point of your DB.'
    DB_PORT=3306
    EXPRESS_PORT=3000
    SECRET_KEY=hanghae_mini_project_secret_key
    COOKIE_NAME=HangHae99
    PW_KEY="sha256"  
    INCOD="base64"
    HASH=sha256
    DIGEST=base64

2.  If you are using a DB with the same name,
    please run the contents below in order at the terminal.
    This is the procedure for 1) database drop 2) create 3) migration.

    1. npx sequelize db:drop --config ./src/config/config.js
    2. npx sequelize db:create --config ./src/config/config.js
    3. npx sequelize db:migrate --config ./src/config/config.js --migrations-path ./src/migrations --models-path ./src/models

3.  Run the server by entering the command in your terminal.
    ex. npm run dev

# Questions / inquiries
