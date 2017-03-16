# RelationshipsG3 [![Join the chat at https://gitter.im/MusicConnectionMachine/RelationshipsG3](https://badges.gitter.im/MusicConnectionMachine/RelationshipsG3.svg)](https://gitter.im/MusicConnectionMachine/RelationshipsG3?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

In this repository we will try to build and determine relationships between composers

##Setup

1. Install the node and npm, from the website (https://nodejs.org/en/download/)
2. Install the docker and docker-compose

###Dockerhub Setup

To Do

##Run Project

####Local Run: 
To run the project locally follow the following steps:

1. After successfully installing it, go into the project root directory and run 
**npm install**. This will install all the dependencies.
2. Now run the server by running the command **npm start**
3. Now open http://localhost:8080/relationshipg3, you will get a welcome message.

####Run inside Docker:
 
 1. Run the shell script inside the script folder.


##Example to test the server
1. First install postman plugin for chrome browser, this will be used to send json query to our application
2. Choose the post, and enter the URL as any from the following:
```
    1. http://localhost:8080/relationshipg3/getAllSentences
    2. http://localhost:8080/relationshipg3/getAllEntities
    3. http://localhost:8080/relationshipg3/getAllEntitySentences
```
    
3. Use the following structure as the **body** with data as "**raw**" and format as "**JSON**"


```
 {
   "article": "path/to/text.txt file",
   "occurrences":
   [
       {
         "term": "Mozart",
         "role": "composer",
         "positions": [ 10, 42 ]
       },
     {
       "term": "Salzburg",
       "role": "city",
       "positions": [ 90 ]
     }
   ]
 }
```
`Note:`
This is in refernce to structure given by team-2.
Also change the path to the absolute path of the "test.txt" file in the example directory
4. Then click on the send. In response to that you will get the required result.
