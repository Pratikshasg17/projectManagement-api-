const Project = require("../models/project");
const STATIC = require("../constants");

const createProject = async (req, res) => {
    const project = new Project(req.body);
    try {
        await project.save();
        res.status(201).send(project);
    } catch(error) {
        res.status(400).send({
          message: STATIC.CREATE_PROJECT_FAIL
        });
    }
};

const fetchProjects = async (req, res) => {
    try {
        const result = await Project.find();
        res.status(200).send({
            projects: result,
            count: result.length
        });
    } catch(error) {
        res.status(400).send({
          message: STATIC.FETCH_PROJECT_FAIL
        });
    }
};


const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        if(!project) {
            return res.status(404).send();
        }
        res.send({
            projectid: project._id,
            message: STATIC.UPDATE_PROJECT_SUCCESS,
        });
    } catch(error) {
        res.status(400).send({
            message: STATIC.UPDATE_PROJECT_FAIL
        });
    }
};

const countProjects = async (req, res) => {
    try {
        const cancel = await Project.find({ status: 'cancel' });

        const running = await Project.find({ status: 'running' });

        const closing = await Project.find({ status: 'close' });

        res.status(200).send ({
            cancel_count: cancel.length,
            running_count: running.length,
            close_count: closing.length,
        });
    } catch(error) {
        res.status(400).send({
          message: STATIC.FETCH_COUNT_FAIL
        })
    }
};

const getDepartmentWiseProject = async (req, res) => {
    try{

        const result = await Project.aggregate([
            {
                $project: {
                    item: { department: "$department" },
                    closeStatusProject: {
                        $cond: [ { $eq: ["$status", "close" ] }, 1, 0]
                    }
                }
            },
            {
                $group: {
                    _id: "$item",
                    doc:{ "$first":"$$ROOT" },
                    totalProject: { $sum: 1 },
                    closedProject: { $sum: "$closeStatusProject" }
                }
            },
            { $addFields: { department: "$doc.item.department" } },
            { $unset: ["_id", "doc"] }
        ])

        res.status(200).send({
            projects: result
        });
    } catch (error) {
      res.status(400).send({
        message: STATIC.FETCH_DEPARTMENT_WISE_PROJECT_FAIL
      });
    }
}

module.exports = {
    createProject,
    fetchProjects,
    updateProject,
    countProjects,
    getDepartmentWiseProject
};
