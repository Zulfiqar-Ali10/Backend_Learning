import express from "express";
const router = express.Router();
import Task from "../models/Task.js";
import sendResponse from "../helpers/sendResponse.js";

// router.post("/", async (req, res) => {
//     const {task} = req.body;
//     let newTask = new Task({task}); 
//     newTask = await newTask.save();
//     res.status(201).json({
//        error: false,
//        data: newTask,
//        msg: "Task Added Successfully",       
//     });
// });


router.post("/", async (req, res) => {
    const {username, task,} = req.body;
    let newTask = new Task({task, username}); 
    newTask = await newTask.save();
   sendResponse(res, 201, newTask, false, "Task Added Successfully");
});


router.get("/", async (req, res) => {
    let tasks = await Task.find();
    sendResponse(res, 200, tasks, false, "Tasks, Fetched Successfully");
});


router.get("/:id", async (req, res) => {
    let task = await Task.findById(req.params.id);
    if(!task) return  sendResponse(res, 404, null, true, "Task Not Found");
     sendResponse(res, 200, task, false, "Tasks, Fetched Successfully");
});


router.put("/:id", async (req, res) => {
    const {username, task, completed,} = req.body;
    let taskFromDb = await Task.findById(req.params.id);
    if(!taskFromDb) return  sendResponse(res, 404, null, true, "Task Not Found");
    
    if(username) taskFromDb.username = username;
    if(task) taskFromDb.task = task;
    if(completed) taskFromDb.completed = completed;
     await taskFromDb.save();
     sendResponse(res, 200, taskFromDb, false, "Task, Updated Successfully");
});



router.delete("/:id", async (req, res) => {
   
    let taskFromDb = await Task.findById(req.params.id);
    if(!taskFromDb) return  sendResponse(res, 404, null, true, "Task Not Found");
     
    await Task.deleteOne({_id: req.params.id});
     sendResponse(res, 200, null, false, "Task, Deleted Successfully");
});

export default router;