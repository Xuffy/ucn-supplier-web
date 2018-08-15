export default {
    categoryId:{
        type:'dropdown',
        dropDownType:'category',
        _isDefaultShow:true,
        _list:[],
        _defaultProps:{
            label: 'name',
            children: 'children'
        }
    },
    nameEnLike:{
        _isDefaultShow:true,
    },
    readilyAvailable:{
        type:'select',
        selectCode:'RA_IS',
        _isDefaultShow:true
    },
    exwPrice:{
        type:'between',
        betweenKey:['minExwPrice','maxExwPrice'],
    },
    codeLike:{},
    nameCnLike:{},
    fobPrice:{
        type:'between',
        betweenKey:['minFobPrice','maxFobPrice'],
    },
    materialEnLike:{},
    outerCartonMethodEnLike:{},
    methodPkgEnLike:{},
    deliveryDates:{
        type:'number'
    },
    descEnLike:{},
    descCnLike:{},
}