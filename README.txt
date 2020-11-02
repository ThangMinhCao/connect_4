Student Name: Minh Thang Cao
Student Number: 101147025

Project Check-in #1:
Project: Connect 4
 ** Working individually **

########################## Install instructions ########################
1. Start terminal, navigate to /connect_4 (current directory), run 'npm install' to install all dependencies for the app.
2. In the same directory (/connect_4), run 'npm run dev' to start both the project's Node.js server on localhost:4000 and React server on localhost:3000.
3. Go to localhost:3000 on any browser to test the application (recommend Chrome).

########################## Initialized Game Accounts ########################
1.  Username: apple
    Password: applepassword
   
2.  Username: mango
    Password: mangopassword
   
3.  Username: pineapple
    Password: pineapplepassword
   
4.  Username: watermelon
    Password: watermelonpassword

5.  Username: orange
    Password: orangepassword


########################## Game play UI instructions ########################
1. Sign up for a new account, then login. There must be one or more other players to start playing.
   You can open an incogito/private browser window or using another browser (using chrome, open firefox) to create account, login and try the app.
2. Create a new room, that room will appear on your 'Not started games' list, and show 'Waiting', and appear on every client's all public room list.
3. Opponent/you can join an available room by clicking the blue arrow button if it's not disabled for some reason, and will be redirected to the game room.
   The room in the 'Not started games' list will turn to 'Ready' and you can go to that room to start the game by clicking 'Start game' button in the game page.
4. Once a game is started, the server will update on both client that the game has started. The owner has red disc color and the other has yellow.
   The first turn's player will be picked randomly. Only the player of the current turn can play, you can look at the information to see the game state.
   When the current player played, it will update on both client that the current player has been switched.
   Players can chat with each other in the chat box.
5. A player can go outside by pressing 'back' button on the browser (I will make a home button later),
   even though, the game is still in progress, you can come back by looking at the current game list for room name, opponent name.
6. The game will continue until a player made a 4 in a row or the board is full.
   If you are the one made the 4 in a row, the window will show 'You win' or otherwise 'You lose', or if the board is full: 'Tie'.
   Then players can click exit to go back to the main page.
7. A finished game will be removed from current game list and all current games of all players.
   The functionalities that the finished games are added to the game histories of users will be added later.
*** NOTES: First going to the application, you need to signup and then login will work.
           You can observe the mongodb's game database to see its changes.
           
# Friend related activities:
1. Click on the white bar on the top to see list of all available users. You can click on any one to see that user's profile (I haven't add game history and winrate to the game yet, will have in the next check-in)
2. You can click on add friend to send a friend request.
   For the senders, now you can cancel the friend request that you just sent by click on the cancel friend request button on the user info dialog.
   For the receivers, you can reject or accept the friend request by click on according buttons in the user info dialog. You can also accept or reject on the friend list on the top right corner.
3. Click on the top right corner's icon, you can see the list of friends, comming friend request that you can accept or reject.
           
####################### List of files/directories ##########################
CLIENT SIDE:
 > Client technologies: React, Material UI and its JSS (Material CSS in JS), axios.
 
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
        - Messages.js: the mongoose model for ingame messages
    * routes: contains the application api's routes.
## These file: node_modules, package.json, package-lock.json, contain the information related to application's dependencies.

#################### Routes/Endpoints ##################
---------- User routes ------------
* POST/users/login: login to the server and get a JWT token
    Params: 
        - username: String
        - password: String
        
* POST/users/signup: sign up for a new user
    Params: 
        - username: String
        - password: String
        
* PUT/users/logout: logout the current user, set "online" to false
    Middlewares:
        - Authorization middleware the verify the access token
    
    Params:
        - token: String
        
* GET/users/verifyUser: verify current token if it's available or not
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String
        
* GET/users: get all available user in the server
    Params: no params

* GET/users/friendList: get all friends of current user
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String

* GET/users/friendRequests: get all comming friend requests of current user
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String

* POST/users/sendFriendRequest: send a friend request to another user
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String
        - targetID: String
        
* POST/users/acceptFriendRequest: accept a comming friend request and add the sender to friend list
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String
        - targetID: String
        
* POST/users/cancelFriendRequest: cancel a sent friend request of current user
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String
        - targetID: String
        
* POST/users/rejectFriendRequest: reject a comming friend request
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String
        - targetID: String
        
* POST/users/unfriend: unfriend another user, both users will be removed from their own friend list
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String
        - targetID: String

---------- Ingame routes ------------
* POST/games/create: use to create a new game room
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String
        - targetID: String

* GET/games: get all public games
    Params: no params

* PUT/games/join: join a public game
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String
        - roomID: String

* PUT/games/playAMove: play a move on a board in current game
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String
        - roomID: String
        - column: number

* PUT/games/startGame: for room owner to start a ready game (has 2 people in the room)
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String
        - roomID: String

* GET/games/getGame: get a game's information (current players, number of moves occured, etc)
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String
        - roomID: String

* GET/games/current: get all current game of current user
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String

* POST/games/sendMessage: send a message to a game that is viewable for both players
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String
        - roomID: String
        - message: String
        
* GET/games/messages: get all messages in a game
    Middlewares:
        - Authorization middleware the verify the access token
    Params: 
        - token: String
        - roomID: String

#################### Finished Functionalities ##################
* Almost finished the app's UI mockup because for the user information dialog, I may change it to a separate page.
* Login/logout/signup using JWT/localStorage.
* Create game room, join game room, add friend (only add, not yet accept and reject request).
* Game play realtime with another opponent.
* Friend system finished: add friend, accept/reject requests, unfriend, cancel sending request
* See active friend list (The UI mockup is on the top right corner's button).
* Chat in game
*** NOTE: every changes related to game room, user are automatically updated when thay have changes. Possibly still having some bugs. ***

################### Not finished Functionalities ###############
* User information for game history and current games (mockup available by clicking on the user search bar and click on one of them).
* Some additional functionalities like remove room, surrender, choosing disc color, sounds, gameplay effects/animations maybe added.
