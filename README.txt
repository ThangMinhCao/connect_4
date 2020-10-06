Student Name: Minh Thang Cao
Student Number: 101147025

Project Check-in #1:
Project: Connect 4
 ** Working individually **

####################### List of files/directories ##########################
CLIENT SIDE:
 > Client technologies: React, Material UI, JSS (Material CSS in JS), axios
 #### For some components, I put the JSS style in the component file together ####
 Note: I'm just listing files/folders that are important, are used and created by me in my application.
 >> Client's source directory: /src
    * routes.jsx: contains the routes to different pages in the client using react-router-dom.
    * index.jsx: main index file of React that render our app to index.html file.
    * App.jsx: main component of my React app.
    * api:
        - server_api.jsx: contains the initialization of axios instance that connect to the server endpoint 'http://localhost:4000/'.
    * assets: contains only some images, icons if needed.
    * constants: contains JavaScript files that hold constants that can be used throughout the application.
        - colors.jsx: contains color constants for the application.
        - discColors.jsx: contains colors for the game discs.
        - endpoints.jsx: contains the string specifications of different server endpoints.
        - fonts.jsx: contains the fonts used in the application.
    * pages: contains different pages of the application
        - ingame: contains components of the ingame page (where we play the game).
            + IngamePage.jsx: main component of the page.
            + GameBoard.jsx: the game's board component.
            + EndGameDialog.jsx: the component that will be displayed when the game ends.
            + GameInfoDrawer.jsx: the top drawer of the page that show the current game's information.
            + StartGameDialog.jsx: I haven't done this component but generally it will be the dialog for game's owner to start the game or show the waiting screen.
            + IngamePage-style.jsx: contains the style of elements in the page, using JSS (CSS in JS).
        - landing: contains components of the landing page (first page you see).
            + LandingPage.jsx: contains the LandingPage component that display the landing page.
        - login: contains components of the login page.
            + LoginPage.jsx: the component that display my login page.
            + LoginPage-style.jsx: contains the style of elements in the login page, using JSS (CSS in JS).
        - room: largest page in the application that contains the main menus, lists after you login.
            + RoomPage.jsx: the main component of the page.
            + UserDrawer.jsx: the left drawer that show brief information of the logged in user.
            + UserInfoDialog.jsx: the dialog that show information of a clicked user. I'm thinking about moving this out to a separate page, so this just shows what it's going to be like.
            + RoomList.jsx: the list contains all public rooms.
            + RoomAppBar.jsx: the top bar of the page which contains the search bar for users, friends button and a button to open the UserDrawer.
            + FriendListMenu.jsx: the friend list component of the user.
            + CurrentGameList.jsx: the list containing all of current games of the logged in user.
            + CurrentGameCard.jsx: the component that specifies each card in the CurrentGameList, its style will be different for different states of the game like waiting for people, your turn, opponent's turn, etc.
            + CreateRoomDialog.jsx: the dialog component that appears every time you click the add button, this will ask you to enter the room name, public or not and create a new room based on the input.
            + RoomPage-style.jsx: contains some styles of main components of the page.
>> Server's souce directory: /server
    * app.js: contains every main instances of the server like express app, HTTP server, mongoose connection, socketio connection, etc.
    * constants: contains the server's constants.
        - secret.js: contains the jwt secret.
    * controllers: contains the main controllers of the server api that hold functions which will be called for each enpoints method.
        - game: contains the controllers related to game room, game play.
            + gamePlayController.js: contains functions that control the game play of the game.
            + gameRoomController.js: contains functions that control the actions related to game room like create room, join room, get all public games, etc.
        - user: contains the controller related to the users.
            + userController.js: contains functions related to user's activities like login, sign up, add friends, get all users, user authentication, etc. 
    * database: mongodb.js: contains the instance of MongoDB that connect to the server.
    * middlewares: contains middlewares that I need.
        - userAuth.js: contains user authorization middleware that will check if the requesting user has permission to request.
    * models: contains mongoose models of the server.
        - Board.js: the mongoose model for the game boards.
        - Game.js: the mongoose model for the games' information.
        - User.js: the mongoose model for users' information.
    * routes: contains the application api's routes.
## These file: node_modules, package.json, package-lock.json, contain the information related to application's dependencies.

########################## Install instructions ########################
1. In this folder (/connect_4), run 'npm install' on terminal to install React dependencies.
2. In the same directory (/connect_4), run 'npm start' to start the client React on localhost:3000
3. Start another terminal instance, navigate to /connect_4/server, run 'npm install' to install all dependencies for the server side.
4. In /connect_4/server, run 'npm start' to start the project's Node.js server on localhost:4000.
5. Go to localhost:3000 on any browser to test the application.
** Note that I haven't finished all functionalities so there may be some problems.

#################### Additional functionalities ##################
* I finished some functionalities related to server side, such as login, logout, signup account, realtime update when a user sign up or create a new public room, every client will be updated that add the room to RoomList component.
* Some functionalities are still in development, such as game play, friend list update, accept friend request, cancel friend request, etc. So for some buttons you click will produce error there.
* First going to the application, you need to sign up and login will work, you can test my application's mockups there. After login, if you want to go to different pages, you can specify room name after localhost:3000 like localhost:3000/ingame.    
