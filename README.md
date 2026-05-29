# Fullstack devops project

To build/launch :
`docker-compose up -d --build --quiet-build`

Project then available at :
`http://localhost:4200`

## Backend path exposed

GET `http://localhost:8090/api/user-list`  
GET `http://localhost:8090/api/type-list`  
GET `http://localhost:8090/api/get-user`  
GET `http://localhost:8090/api/get-type` 
POST `http://localhost:8090/api/create-user`  
POST `http://localhost:8090/api/create-type`  

create-user and create-type can update object already in database if id is given
