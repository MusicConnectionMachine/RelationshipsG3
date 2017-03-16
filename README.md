# RelationshipsG3 [![Join the chat at https://gitter.im/MusicConnectionMachine/RelationshipsG3](https://badges.gitter.im/MusicConnectionMachine/RelationshipsG3.svg)](https://gitter.im/MusicConnectionMachine/RelationshipsG3?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

In this repository we will try to build and determine relationships between composers

## Setup

1. Install the node and npm, from the website (https://nodejs.org/en/download/)
2. Install the docker and docker-compose

### Dockerhub Setup

To Do

## Run Project

#### Local Run: 
To run the project locally follow the following steps:

1. After successfully installing it, go into the project root directory and run 
**npm install**. This will install all the dependencies.
2. Now run the server by running the command **npm start**
3. Now open http://localhost:8080/relationshipg3, you will get a welcome message.

#### Run inside Docker:
 
 1. Run the shell script inside the script folder.

#### Relationship Extraction Algorithms
Relationship extraction algorithm will be running in a seprate container and our main application
will interact with it to get the relationship. 

Scripts are added to run the algorithms inside the docker.
 
We are considering **Ollie** and **Open-IE(by Washington univ)** algorithms for relationship extraction.

Node.js wrapper is added for both the algorithms.
Input to the ALgorithms can be provided in either a text file format or Array of strings format.
```
{
   "inputpath":"example/test.txt"
 }
 or 
 {
    "array":["hello i am here", "whats is going on"]
  }
```
The output from the ollie algorithm will be in this format:
```
{
    "sentence": "Educated at the Royal College of Music, he began his career contributing songs to revues and incidental music for the stage, forming a notable partnership with the playwright Clemence Dane.",
    "instances": [
      {
        "quality": "0.857",
        "term1": "Educated",
        "term2": "began",
        "term3": "his career contributing songs to revues and incidental music for the stage"
      },
      {
        "quality": "0.846",
        "term1": "his career",
        "term2": "contributing songs to",
        "term3": "revues and incidental music"
      },
      {
        "quality": "0.761",
        "term1": "he",
        "term2": "began",
        "term3": "his career contributing songs to revues and incidental music for the stage"
      },
      {
        "quality": "0.577",
        "term1": "songs",
        "term2": "be contributing to",
        "term3": "revues and incidental music"
      },
      {
        "quality": "0.528",
        "term1": "Educated",
        "term2": "began his career contributing songs to revues and incidental music for the stage forming",
        "term3": "a notable partnership"
      },
      {
        "quality": "0.373",
        "term1": "he",
        "term2": "began his career contributing songs to revues and incidental music for the stage forming",
        "term3": "a notable partnership"
      }
    ]
  },
  {....}
  ```
The output from the openIE algorithm will be in this format:
  ```

[
  {
    "sentence": "Educated at the Royal College of Music, he began his career contributing songs to revues and incidental music for the stage, forming a notable partnership with the playwright Clemence Dane.",
    "instances": [
      {
        "quality": "0.2560951955542683",
        "term1": "he",
        "term2": "his career",
        "relation": "began"
      },
      {
        "quality": "0.3880890333449538",
        "term1": "he",
        "term2": "to revues and incidental music",
        "relation": "began his career contributing"
      },
      {
        "quality": "0.292827695956731",
        "term1": "he",
        "term2": "a notable partnership with the playwright",
        "relation": "began his career forming"
      }
    ]
  },
  {...}
  ]
   ```
These APIs will be called from the main application.

**Note:**
1. Download/Build the complete JAR of the ollie algorithm and copy it inside the ollie 
  directory inside algorithms folder. https://github.com/knowitall/ollie
  2. Download/Build the complete JAR of the OpenIE algorithm and copy it inside the openie 
       directory inside algorithms folder. https://github.com/knowitall/openie
## Example to test the server
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
Also change the path to the absolute path of the "test.txt" file in the example directory.
4. Then click on the send. In response to that you will get the required result.
