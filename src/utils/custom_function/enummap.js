export default function enummap(enumToConvert){
    var mapGenerated = {};
    for (var i = 0;i<(Object.keys(enumToConvert).length/2);i++){
        mapGenerated[Object.keys(enumToConvert)[i]]=Object.values(enumToConvert)[i];
    }
    return mapGenerated;
}
