#!/bin/bash
mongoimport --db connect4DB --collection boards --file ./initialData/connect4DB.boards.json --jsonArray
mongoimport --db connect4DB --collection games --file ./initialData/connect4DB.games.json --jsonArray
mongoimport --db connect4DB --collection messages --file ./initialData/connect4DB.messages.json --jsonArray
mongoimport --db connect4DB --collection users --file ./initialData/connect4DB.users.json --jsonArray
