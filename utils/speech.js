export const speechCondition = (t) => {
  // is it a coordinate with pattern: `<LETTER><NUMBER>` (length: 2) [LP1, NP1]
  // is it a coordinate with pattern: `lettre <LETTER> chiffre <NUMBER>` (length: 18) [LP2, NP2]
  if (t.length === 2 || t.length === 18) {
    const NP1 = parseInt(t[1]);
    const NP2 = parseInt(t[17]);

    // is the second character is a number
    if (NP1 === 1 || NP1 === 2 || NP1 === 3 || NP1 === 4 || NP1 === 5 || NP1 === 6 || NP1 === 7 || NP1 === 8 || NP2 === 1 || NP2 === 2 || NP2 === 3 || NP2 === 4 || NP2 === 5 || NP2 === 6 || NP2 === 7 || NP2 === 8) {
      let id = null;

      const LP1 = t[0];
      const LP2 = t[7];

      // is the first character is a letter
      if (LP1 === "A" || LP2 === "A") {
        id = 56;
      } else if (LP1 === "B" || LP2 === "B") {
        id = 57;
      } else if (LP1 === "C" || LP2 === "C") {
        id = 58;
      } else if (LP1 === "D" || LP2 === "D") {
        id = 59;
      } else if (LP1 === "E" || LP2 === "E") {
        id = 60;
      } else if (LP1 === "F" || LP2 === "F") {
        id = 61;
      } else if (LP1 === "G" || LP2 === "G") {
        id = 62;
      } else if (LP1 === "H" || LP2 === "H") {
        id = 63;
      } else {
        return;
      }

      // update id with number data
      if (NP1) {
        id = id - 8 * (NP1 - 1);
      } else if (NP2) {
        id = id - 8 * (NP2 - 1);
      } else {
        return;
      }

      // add a click event on the coordinate listen
      return document.querySelector(".grid").children[id].click();
    }

    return;
  }
};
