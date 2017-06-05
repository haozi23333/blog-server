/**
 * Created by haozi on 6/1/2017.
 */

import {IsString, Length} from 'class-validator'

/**
 * 233
 */
export class ValidationUserLoginForUsernamAndPassword {

  @Length(1, 20)
  @IsString()
  public username: string

  @Length(5, 32)
  @IsString()
  public password: string
}

export class ValidationUserLoginForCookie {

  @Length(34, 128)
  @IsString()
  public cookie: string
}
