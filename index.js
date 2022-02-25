require("./db/mongoose");
var cors = require('cors');

const userRouter = require("./routers/user");
const projectRouter = require("./routers/project");


const express = require("express");

const app = express();
const port = 3004;

app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/project', projectRouter);

app.listen(port,()=> {
    console.log("server is up and running on port "+port);
});
