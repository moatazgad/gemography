const fetch = require("node-fetch");

exports.receiveRepos = async (req, res, next) => {
  let reposList; // Retrieved List
  let minimizedList = []; // Filtered List That Contains (id, name, description, url, language)
  let listObject;
  let noNullLanguageList; // Removing Repos With Null Language
  let languagesUsed = new Set(); // Set Of All Languages Used
  let languagesArray; //Array Of All Languages Used
  let forEachLanguageList = []; //List Of Repos For Each Langauge
  let outputObject;
  let outputList = []; // Output List Which Contains Languages Used, Repos Used In Each Language, And Their Count
  const date = req.params.date;

  // Fetching Repos List
  await fetch(
    `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc`
  )
    .then((resRepos) => {
      if (resRepos.status != 200) {
        const error = new Error("Repos Not Found");
        error.statusCode = 404;
        throw error;
      }
      return resRepos.json();
    })

    // Filtering The Retrieved Repos
    .then((result) => {
      reposList = result;
      for (let i = 0; i < reposList.items.length; i++) {
        listObject = {
          id: reposList.items[i].id,
          name: reposList.items[i].name,
          description: reposList.items[i].description,
          url: reposList.items[i].url,
          language: reposList.items[i].language,
        };
        minimizedList.push(listObject);
      }
      return minimizedList;
    })

    // Returning Repos With No Null Languages
    .then((result) => {
      noNullLanguageList = result.filter((item) => {
        return item.language != null;
      });
    })

    // Creating Array Of All Languages Used
    .then((result) => {
      noNullLanguageList.forEach((value) => {
        languagesUsed.add(value.language);
      });
      languagesArray = Array.from(languagesUsed);
    })

    // Creating Array Which Contains Each Language And Its Repos And Their Count
    .then((result) => {
      for (let i = 0; i < languagesArray.length; i++) {
        forEachLanguageList = noNullLanguageList.filter((value) => {
          return value.language == languagesArray[i];
        });
        outputObject = {
          language: languagesArray[i],
          reposCount: forEachLanguageList.length,
          reposUsed: forEachLanguageList,
        };
        outputList.push(outputObject);
      }
    });

  res.status(200).json({
    message: "List retrieved successfully",
    unfilteredList: reposList,
    minimizedList: minimizedList,
    filteredList: noNullLanguageList,
    languagesArray: languagesArray,
    outputList: outputList,
  });
};
