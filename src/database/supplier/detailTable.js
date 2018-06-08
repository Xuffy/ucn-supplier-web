export default {
    country: {
        key: 'country',
        belong: "address"
      },
      province: {
        key: 'province',
        belong: "address"
      },
      city: {
        key: 'city',
        belong: "address"
      },
      companyAddress: {
        key: 'address',
        belong: "address"
      },
      receiveCountry: {
        key: 'receiveCountry',
        belong: "address"
      },
      receiveProvince: {
        key: 'receiveProvince',
        belong: "address"
      },
      receiveCity: {
        key: 'receiveCity',
        belong: "address"
      },
      receiverAddress: {
        key: 'receiveAddress',
        belong: "address"
      },
      notify: {
          key: "notify",
          belong: "address"
      },
      id: {
          _hide: true,
          key: "id",
      },
  
    //.............concats
    contactName: {
        key: 'name',
        belong: "concats"
    },
    department: {
        key: 'deptName',
        belong: "concats"
    },
    gender: {
        key: 'gender',
        belong: "concats"
    },
    position: {
        key: 'position',
        belong: "concats"
    },
    mobileNo: {
        key: 'cellphone',
        belong: "concats"
    },
    tel: {
        key: 'telphone',
        belong: "concats"
    },
    faxNumber: {
        key: 'fax',
        belong: "concats"
    },
    email: {
        key: 'email',
        belong: "concats"
    },
    skype: {
        key: 'skype',
        belong: "concats"
    },
    qq: {
        key: 'qq',
        belong: "concats"
    },
    remark: {
        key: 'remark',
        belong: "concats"
    },
    //       document
    documentRequired:{
        key:"document"
    },
    factoryInspectionReport:{
        key:"factoryInspectionReport"
    },
    invoice:{
        key:'invoice'
    },
    examiningReport:{
        key:'examiningReport'
    },
    packingList:{
        key:"packingList"
    },
    examiningReport:{
        key:"examiningReport"
    },
    //询价历史
    inquiryNo: {
        key: 'inquiryNo',
        belong: "inquiry"
    },
    inquiryDate: {
        key: 'entryDt',
        belong: "inquiry"
    },
    incoterm: {
        key: 'incoterm',
        belong: "inquiry"
    },
    skuQuantityOfInquiry: {
        key: 'skuQty',
        belong: "inquiry"
    },
    quantityOfCarton: {
        key: 'updateDt',
        belong: "inquiry"
    },
    totalNetWeight: {
        key: '',
        belong: "inquiry"
    },
    totalRoughWeight: {
        key: '',
        belong: "inquiry"
    },
    totalVolum: {
        key: '',
        belong: "inquiry"
    },
    //order
    orderNumber: {
        key: 'orderNo',
        belong: "order"
    },
    orderDate: {
        key: 'entryDt',
        belong: "order"
    },
    orderStatus: {
        key: 'status',
        belong: "order"
    },
    actDeliveryDate: {
        key: 'deliveryDt',
        belong: "order"
    },
    quantityOfSKU: {
        key: 'skuQty',
        belong: "order"
    },
    totalCartonOfSku: {
        key: 'totalOuterCartonQty',
        belong: "order"
    },
    totalSkuNetWeight: {
        key: 'totalNetWeight',
        belong: "order"
    },
    totalSkuRoughWeight: {
        key: 'totalGrossWeight',
        belong: "order"
    },
    totalSkuVolume: {
        key: 'totalVolume',
        belong: "order"
    },
    loadingDate: {
        key: '',
        belong: "order"
    },
    dateOfBL: {
        key: '',
        belong: "order"
    },
     // remark
    date: {
        key: 'updateDt',
        belong: "remark"
    },
    remark: {
        key: 'remark',
        belong: "remark"
    },
    operater: {
        key: 'entryName',
        belong: "remark"
    },
    version: {
        key: 'version',
        belong: "remark",
        _hide: true,
    },
    id: {
        key: 'id',
        belong: "remark",
        _hide: true,
    },
}
