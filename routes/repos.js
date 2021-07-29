const express = require("express");

const reposController = require("../controllers/repos");

const router = express.Router();

// Date Must Be Entered In The Request Params In This Formula (YYYY-MM-DD)
router.get("/:date", reposController.receiveRepos);

module.exports = router;
