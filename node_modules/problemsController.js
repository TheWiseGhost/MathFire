import problemsDAO from "./problemsDAO.js";

export default class problemCtrl {
  static async getProblem(req, res) {
    try {
      let id = req.params.id || {};
      console.log(id)
      let problem = await problemsDAO.getProblem(id);
      console.log("ProblemCtrl problem = " + JSON.stringify(problem))

      if (!problem){
        res.status(404).json({error: "Not found"});
        return;
      }
      res.json(problem);
    } catch (e) {
      console.log(`GetProblem: ${e}`);
      res.status(500).json({error: e});
    }
  }

  static async getAllProblems(req, res, next) {
    try {
      let problems = await problemsDAO.getAllProblems();
      console.log("ProblemCtrl getAllProblems = " + JSON.stringify(problems))

      if (!problems) {
        res.status(404).json({error: 'not found'});
        return;
      }

      res.json(problems);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({error: e});
    }
  }

  static async getProblemsByType(req, res, next) {
    try {
      let type = req.params.type || {};
      let problems = await problemsDAO.getProblemsByType(type);
      console.log("ProblemCtrl getProblemsByType = " + JSON.stringify(problems))

      if (!problems) {
        res.status(404).json({error: 'not found'});
        return;
      }

      res.json(problems);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({error: e});
    }
  }
}
