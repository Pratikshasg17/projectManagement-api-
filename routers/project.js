const express = require("express");

const {
       createProject,
       fetchProjects,
       updateProject,
       countProjects,
       getDepartmentWiseProject

} = require("../controllers/project");

const router = express.Router();

router.post("/", createProject);

router.get("/", fetchProjects);

router.get("/count", countProjects);

router.patch("/:id", updateProject);

router.get("/department_wise_project", getDepartmentWiseProject);

module.exports = router;
