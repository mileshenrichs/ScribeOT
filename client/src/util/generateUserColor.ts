/**
 * Generates a random color to be assigned to a new user who has joined the document.
 * Each color has the same saturation and lightness, so the only variation within colors is the hue.
 * Colors are expressed as hsl(h, s%, l%) strings.
 */

const SATURATION = 75;
const LIGHTNESS = 60;

const generateUserColor: () => string = () => {
    const minHue = 0;
    const maxHue = 360;
    const randomHue = Math.floor(Math.random() * (maxHue - minHue + 1)) + minHue;

    return 'hsl(' + randomHue + ', ' + SATURATION + '%, ' + LIGHTNESS + '%)';
};

export default generateUserColor;