const fs = require("fs");

// 将leetcode-all处理成map结构
const initDB = () => {
  const leetcodeAllStr = fs.readFileSync("./origin/leetcode-all.json", "utf8");
  const leetcodeAll = JSON.parse(leetcodeAllStr);

  const db = {};
  leetcodeAll.stat_status_pairs.forEach(pair => {
    db[pair.stat.question_id] = pair;
  });

  fs.writeFileSync("db-init.json", JSON.stringify(db));
};

// 根据leetcode-database、leetcode-shell、leetcode-thread标记一下db中的题目的类型
const labelQuestion = () => {
  const dbStr = fs.readFileSync("db-init.json", "utf8");
  const db = JSON.parse(dbStr);

  const files = {
    database: "./origin/leetcode-database.json",
    shell: "./origin/leetcode-shell.json",
    thread: "./origin/leetcode-thread.json"
  };

  Object.keys(files).forEach(type => {
    const filename = files[type];
    const leetcodeDatabaseStr = fs.readFileSync(filename, "utf8");
    const leetcodeDatabase = JSON.parse(leetcodeDatabaseStr);
    const databaseArr = leetcodeDatabase.stat_status_pairs.map(
      pair => pair.stat.question_id
    );

    databaseArr.forEach(item => {
      db[item].type = type;
    });
  });

  Object.keys(db).forEach(key => {
    if (db[key].type === undefined) {
      db[key].type = "common";
    }
  });

  fs.writeFileSync("db.json", JSON.stringify(db));
};
