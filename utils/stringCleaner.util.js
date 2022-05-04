const accentsRemover = (str) => {
    str = str.toLowerCase().split(' ').join('-')
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

module.exports = accentsRemover;