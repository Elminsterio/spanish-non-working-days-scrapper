// const fs = require('fs');
// const municipios = require('./municipios_ign.json');

export const accentsRemover = (str: string) => {
    str = str.toLowerCase().split(' ').join('-')
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

export const accentsRemover2 = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

const provincias = {
    ES111:	'A Coruña',
    ES112:	'Lugo',
    ES113:	'Orense',
    ES114:	'Pontevedra',
    ES120:	'Principado de Asturias',
    ES130:	'Cantabria',
    ES211:	'Álava',
    ES212:	'Guipúzcoa',
    ES213:	'Vizcaya',
    ES220:	'Comunidad Foral de Navarra',
    ES230:	'La Rioja',
    ES241:	'Huesca',
    ES242:	'Teruel',
    ES243:	'Zaragoza',
    ES300:	'Comunidad de Madrid',
    ES411:	'Ávila',
    ES412:	'Burgos',
    ES413:	'León',
    ES414:	'Palencia',
    ES415:	'Salamanca',
    ES416:	'Segovia',
    ES417:	'Soria',
    ES418:	'Valladolid',
    ES419:	'Zamora',
    ES421:	'Albacete',
    ES422:	'Ciudad Real',
    ES423:	'Cuenca',
    ES424:	'Guadalajara',
    ES425:	'Toledo',
    ES431:	'Badajoz',
    ES432:	'Cáceres',
    ES511:	'Barcelona',
    ES512:	'Gerona',
    ES513:	'Lérida',
    ES514:	'Tarragona',
    ES521:	'Alicante',
    ES522:	'Castellón',
    ES523:	'Valencia',
    ES531:	'Ibiza y Formentera',
    ES532:	'Mallorca',
    ES533:	'Menorca',
    ES611:	'Almería',
    ES612:	'Cádiz',
    ES613:	'Córdoba',
    ES614:	'Granada',
    ES615:	'Huelva',
    ES616:	'Jaén',
    ES617:	'Málaga',
    ES618:	'Sevilla',
    ES620:	'Región de Murcia',
    ES630:	'Ceuta',
    ES640:	'Melilla',
    ES703:	'El Hierro',
    ES704:	'Fuerteventura',
    ES705:	'Gran Canaria',
    ES706:	'La Gomera',
    ES707:	'La Palma',
    ES708:	'Lanzarote',
    ES709:	'Tenerife'
}

const comunidades = {
    ES11:'Galicia',
    ES12:'Principado de Asturias',
    ES13:'Cantabria',
    ES21:'País Vasco',
    ES22:'Comunidad Foral de Navarra',
    ES23:'La Rioja',
    ES24:'Aragón',
    ES30:'Comunidad de Madrid',
    ES41:'Castilla y León',
    ES42:'Castilla-La Mancha',
    ES43:'Extremadura',
    ES51:'Cataluña',
    ES52:'Comunidad Valenciana',
    ES53:'Islas Baleares',
    ES61:'Andalucía',
    ES62:'Región de Murcia',
    ES63:'Ciudad Autónoma de Ceuta',
    ES64:'Ciudad Autónoma de Melilla',
    ES70:'Canarias'
}

function cleanString(value: string) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function cleanStringRare(value: string ) {
    const normalizado = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const stringRegexed = normalizado.split(' ');

    const [initial, ] = stringRegexed;
    const final = stringRegexed[stringRegexed.length - 1];

    if(initial === 'la' || 
       initial === 'el' ||
       initial === 'los'||
       initial === 'las') {
        
        stringRegexed.pop();
        stringRegexed.shift();

        stringRegexed.push(final + ', ' + initial);

        const stringRare = stringRegexed.join(' ');
        return stringRare;
    } else {
        return normalizado;
    }
}

/* const cleanerMunicipios = () => {
    let parsed = municipios.map((values, index) => {
        let fields = values.fields;
        const provincia = provincias[fields.codnut3];
        const comunidad = comunidades[fields.codnut2];
        const withoutScrap = { index,
                               comunidad: cleanString(comunidad), 
                               provincia: cleanString(provincia), 
                               municipio: cleanString(fields.nameunit),
                               municipioDestructure: cleanStringRare(fields.nameunit),
                               codigoINE: Symbol(fields.codigoine), 
                               codnut2: fields.codnut2, 
                               codnut3: fields.codnut3 };
        return withoutScrap;
    });
    fs.writeFileSync('./municipiosClean.json', JSON.stringify(parsed));
};
*/

