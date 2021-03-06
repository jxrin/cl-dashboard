var moment = require("moment");
var Task = require("../models/task");

const add = (req, res) => {
  var newTask = new Task(req.body);
  newTask.date = moment().format("MMM Do YY");
  return newTask
    .save()
    .then(createdTask => res.json(createdTask))
    .catch(error => {
      console.error(error);

      return res.json({ message: "Error" });
    });
};

const get = (req, res) => {
  return Task.find({ complete: false })
    .then(tasks => res.json(tasks))
    .catch(error => res.json({ message: "Error" }));
};

const remove = (req, res) => {
  const { _id } = req.body;

  return Task.deleteOne({ _id })
    .exec()
    .then(deleted =>
      res.json({
        message: "Task deleted successfully"
      })
    )
    .catch(error =>
      res.status(500).json({
        message: "Error deleting Task"
      })
    );
};

module.exports = {
  get,
  add,
  remove
};
