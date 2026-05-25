/**
 * Utility function to chunk an array into smaller arrays of a specified size.
 * @param {Array} array - The array to be chunked.
 * @param {number} size - The size of each chunk.
 * @returns {Array[]} An array of chunks.
 */
const chunkArray = (array, size) => {
  const chunks = [];

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
};

module.exports = {
  chunkArray,
};