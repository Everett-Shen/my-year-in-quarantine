import _ from "lodash";

const getTitleAndDescription = (location) => {
  let firstCommaIndex = location.indexOf(",");
  return [
    location.substring(0, firstCommaIndex),
    location.substring(firstCommaIndex + 1),
  ];
};

const sortEntries = (entries) => {
  entries.sort((entryA, entryB) => {
    let dateA = Date.parse(entryA.date ? entryA.date : entryA.from);
    let dateB = Date.parse(entryB.date ? entryB.date : entryB.from);
    return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
  });
  return entries;
};

const organizeAnswers = (answers) => {
  let toReturn = {};
  if (!_.isEmpty(answers)) {
    toReturn.location = answers.Q1.location.label;
    // combine Q2 and Q4, sort
    let nonBlankLocations = [
      // needs to be a deep copy. currently shallow copying
      ...answers.Q2.entries.filter(
        (entry) => typeof entry.location === "object"
      ),
    ];
    // organize q2 into entry format
    let newQ2 = [];
    nonBlankLocations.map((entry) => {
      let location = entry.location.label;
      let date = entry.date;
      let [entryTitle, entryDescription] = getTitleAndDescription(location);

      let newEntry = {};
      newEntry.entry = entryTitle;
      newEntry.description = `📍 ${entryDescription.trim()} `;
      newEntry.location = location;
      newEntry.date = date;
      newQ2.push(newEntry);
    });
    toReturn.entries = [...answers.Q4.entries, ...newQ2];
    sortEntries(toReturn.entries);
    toReturn.presentBlurb = answers.Q5.text;
    toReturn.name = answers.Q6.name;

    // toReturn.title = answers.Q5.title;
    // ? answers.Q5.title
    // : `${toReturn.name}'s year in quarantine`;
  }

  return toReturn;
};

export { organizeAnswers, sortEntries };
