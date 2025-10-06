// this is like fake for now cuz wla pa tayon gtotoong database

export const db = {
  query: (sql, params, callback) => {
    console.log("🧠 Mock query executed:", sql, params);
    callback(null, [{ message: "Mock data response" }]);
  }
};
