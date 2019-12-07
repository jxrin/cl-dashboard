var moment = require("moment");
var Goal = require("../models/goal");

// initialize date filter

const add = (req, res) => {
  // console.log(req.body);
  var newGoal = new Goal(req.body);
  newGoal.date = moment().format("MMM Do YY");
  return newGoal
    .save()
    .then(createdGoal => res.json(createdGoal))
    .catch(error => {
      console.error(error);
      return res.json({ message: "Error" });
    });
};

const get = (req, res) => {
  return Goal.find({ complete: false })
    .then(tasks => res.json(tasks))
    .catch(error => res.json({ message: "Error" }));
};

const getComplete = (req, res) => {
  return Goal.find({ complete: true })
    .then(tasks => res.json(tasks))
    .catch(error => res.json({ message: "Error" }));
};

const edit = (req, res) => {
  var temp = req.body;
  console.log(temp._id);
  console.log(temp.complete);
  return Goal.findByIdAndUpdate(
    temp._id,
    { complete: true },
    { returnOriginal: false },
    (err, todo) => {
      // Handle any possible database errors
      if (err) return res.status(500).send(err);
      return res.send(todo);
    }
  );
};

const remove = (req, res) => {
  const { _id } = req.body;

  return Goal.deleteOne({ _id })
    .exec()
    .then(deleted =>
      res.json({
        message: "Goal deleted successfully"
      })
    )
    .catch(error =>
      res.status(500).json({
        message: "Error deleting Goal"
      })
    );
};

module.exports = {
  get,
  getComplete,
  add,
  remove,
  edit
};
