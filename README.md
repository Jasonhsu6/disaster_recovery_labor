# Disaster Recovery Labor

They constantly hire labor and equipment from local contractor on an hourly rate. This process involves timecard submission and approval process. This document describes the basic functionality of the process of filling out a timecard a submission process.

To try out, all you have to do is:
* Clone the git repository
* Then do a `npm install` inside of the folders Disaster and Labor_Management
* Make a dotenv file in the root folder then make the following variables - 
  * MONGOURL - Mongouri from which ever mongo database you use.
  * SECRET - Whatever combination of numbers and letters used to be the secret for your JWT Token.
  * PORT - Port number of the server.
* In one Terminal/Command Prompt, run `ng serve` in Disaster
* In another, run `nodemon server` in Labor_Management
* Finally, watch the magic happen [here](http://localhost:4200/ "Disaster Recovery Labor")
