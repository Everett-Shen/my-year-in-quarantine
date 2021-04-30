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
      ...answers.Q2.entries.filter(
        (entry) => typeof entry.location === "object"
      ),
    ];
    // organize q2 into entry format
    nonBlankLocations.map((entry) => {
      let location = entry.location.label;
      let [entryTitle, entryDescription] = getTitleAndDescription(location);

      entry.entry = entryTitle;
      entry.description = `📍 ${entryDescription.trim()} `;
      entry.location = location;
    });
    toReturn.entries = [...answers.Q4.entries, ...nonBlankLocations];
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
