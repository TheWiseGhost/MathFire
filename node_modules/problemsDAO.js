import mongodb from "mongodb";

let problems;

export default class problemsDAO {
  static async injectDB(connection) {
    // Is there already a database connection?
    try {
      // Could be multiple collections in the main database
      problems = await connection.db().collection("Problems");
      console.log("Connected to problems collection");
    } catch (e) {
      console.error(`Unable to establish connection handles in userDAO: ${e}`);
    }
  }

  // Get a problem
  static async getProblem(id) {
    try {
      console.log(id);
      let cursor = await problems.findOne({_problemId: id});
      console.log('cursor = ' + cursor);
      return cursor;
      // CURSOR IS NULL FOR SOME REASON
    } catch(e) {
      console.log(`Error with getProblem(): ${e}`);
      return {error: e};
    }
  }

  static async getAllProblems() {
    try {
      let cursor = await problems.find().toArray();
      console.log('getAllProblems cursor = ' + cursor);
      return cursor;
    } catch(e) {
      console.log(`Error with getAllProblems(): ${e}`);
      return {error: e};
    }
  }

  static async getProblemsByType(type) {
    try {
      console.log(type);
      let cursor = await problems.find({problemType: type}).toArray();
      console.log('getProblemsByType cursor = ' + cursor);
      return cursor;
    } catch(e) {
      console.log(`Error with getProblemsByType(): ${e}`);
      return {error: e};
    }
  }
}
