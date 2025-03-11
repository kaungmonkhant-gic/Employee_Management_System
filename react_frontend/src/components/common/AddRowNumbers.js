// utils/addRowNumbers.js

const addRowNumbers = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map((item, index) => ({
      ...item,
      number: index + 1, // Sequential numbering
    }));
  };
  
  export default addRowNumbers;
  