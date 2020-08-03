const TRANS_FIELD: Type.Object = [
  {
    name: '型号',
    key: 'Model',
  },
  {
    name: '焦距',
    key: 'FocalLength',
  },
  { name: '参数', val: '${res.FNumber.val}, ${(res.ExposureTime.val).split(" ")[0]}s, IOS${res.ISOSpeedRatings.val}' },
  // {
  //   name: '光圈',
  //   key: 'FNumber',
  // },
  // {
  //   name: '快门',
  //   key: 'ShutterSpeedValue',
  // },
  // {
  //   name: '快门',
  //   key: 'ExposureTime',
  // },
  // {
  //   name: 'ISO',
  //   key: 'ISOSpeedRatings',
  // },
  { name: '时间', key: 'DateTime' },
]

export default TRANS_FIELD
