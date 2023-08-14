import R from './ramda.js';
/**
 * @namespace Score
 * @author A. Freddie Page
 * @version 2022.23
 * This module provides the scoring system for a Tetris Game.
 */
const Score = {};

/**
 * The score object contains information about the score of the game.
 * Currently it is implemented as a single number,
 * but could include other information such as the number of lines cleared.
 * @typedef {Object} Score
 * @property {Number} score  -Total points accumulated in the game.
 * @property {Number} lines_cleared -Total Number of lines tha has been cleared in the game.
 * @property {Boolean} last_clear_is_tetris -If the last clearance is a tetris
* @memberof Score
 */

/**
 * Returns a game state for a new Tetris Game.
 * @function
 * @memberof Score
 * @returns {Score.Score} The new game.
 */
Score.new_score = function () {
    return {score: 0, lines_cleared:0, last_clear_is_tetris: false};
};

/**
 * calucalate the current level of the game
 * Returns the current level of the game.
 * @function
 * @memberof Score
 * @param socre initial counts of points and lines cleared.
 * @returns {Number} current level of game.
 */
Score.level = function (score) {
    return Math.floor(score.lines_cleared/10)+1;
};

const scoreSheet = [0,100,300,500,800,1200];

/**
 * Attempt to set a score counting system for clearing lines
 * If no lines is cleared in this stage, it returns the innitial score.
 * Otherwise, it checks if this clearance is a back-to-back tetris.
 * The otherwise would add up the scores and lines cleared accoding to the current level and number of lines cleared.
 * returns a new score object with new socres and lines cleared.
 * @function
 * @memberof Score
 * @param score - the counts of score and lines cleaered
 * @param {Number} noOfLines -the number of lines cleared i this action
 * @returns {Score.Score} The new counts of score and lines cleared after lines in the game cleared.
 */
Score.cleared_lines = function(noOfLines, score) {
    console.log("clear", noOfLines)
    if(!noOfLines){
        return score;
    }
    const {score : currentScore = 0, lines_cleared = 0, last_clear_is_tetris = false} = score;
    
    const newScore = last_clear_is_tetris && noOfLines===4 ? scoreSheet[5]*Score.level(score) : scoreSheet[noOfLines] * Score.level(score);

    return {score:newScore+currentScore, lines_cleared:noOfLines+lines_cleared, last_clear_is_tetris: noOfLines === 4};
}

/**
 * Input the innitial score and pointed to be added.
 * Add them together to update the score.
 * @function
 * @memberof Score
 * @param score 
 * @param points points scored in the action of soft drop or hard drop
 * @returns {Score.Score} The updated counts of score after a action of soft drop or hard drop.
 */
Score.add_points = function(score, points) {
    return R.mergeRight(score, {score: score.score + points});
}

export default Object.freeze(Score);