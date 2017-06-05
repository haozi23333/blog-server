/**
 * Created by haozi on 6/1/2017.
 */

import {IsString, Length} from 'class-validator'

export class ValidatorCreateCommit {

  @IsString()
  public message: string

  @IsString()
  public markdown: string
}
