const accentsRemover = (str) => {
    str = str.toLowerCase().split(' ').join('-')
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

const accentsRemover2 = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 


module.exports = {
    accentsRemover,
    accentsRemover2
};