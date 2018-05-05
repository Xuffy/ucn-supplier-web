const getData = (oData, type) => {
    var type = type || '';

    let oYear = oData.getFullYear(),
        oMonth = oData.getMonth() + 1,
        oDay = oData.getDate(),
        oHour = oData.getHours(),
        oMin = oData.getMinutes(),
        oS = oData.getSeconds();

    switch (type) {
        case 1:
            return oYear;
        case 2:
            return oMonth;
        case 3:
            return oDay;
        case 4:
            return oHour;
        case 5:
            return oMin;
        case 5:
            return oS;
        case 6:
            return `${oYear}-${oMonth}-${oDay} ${oHour}:${oMin}:${oS}`;
        case 7:
            return `${oYear}-${oMonth}-${oDay} ${oHour}:${oMin}`;
        default:
            return `${oYear}-${oMonth}-${oDay}`;
    }
};

export {
    getData
}