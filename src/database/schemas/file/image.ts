/**
 * Created by haozi on 5/31/2017.
 */
import {Document, Schema, model} from 'mongoose'

import {FileSchema, IFile} from './file'

interface IImage extends IFile {
  width: number
  height: number
}

const ImageSchema = FileSchema.extend({
  width: {
    type: Number,
    require: true,
  },
  height: {
    type: Number,
    require: true,
  },
})

const imageFileModule = model<IImage>('imageFile', ImageSchema)

export {
  IImage,
  imageFileModule,
}
