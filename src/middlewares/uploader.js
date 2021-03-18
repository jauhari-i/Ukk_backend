import { v2 as Cloudinary } from 'cloudinary'
import { getConfig } from '../config/global_config'

const cloudinaryConfig = getConfig('/cloudinaryConfig')

Cloudinary.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: cloudinaryConfig.apiKey,
  api_secret: cloudinaryConfig.apiSecret,
})

export const UploadFile = async file => {
  const uploaded = await Cloudinary.uploader.upload(file, {
    overwrite: true,
    invalidate: true,
    use_filename: true,
    folder: 'laporan',
    resource_type: 'auto',
  })
  return uploaded
}

export const DeleteFile = async public_id => {
  const query = await Cloudinary.uploader.destroy(public_id, {
    resource_type: 'auto',
  })
  return query
}
