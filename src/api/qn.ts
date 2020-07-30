import fetch from '../utils/axios'

export const getList = (params: Type.Object) => fetch('pic/list', params, 'get')

export const getExif = (url: string, params: Type.Object) => fetch(`${url}?exif`, params, 'get')
