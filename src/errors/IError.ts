/**
 * Created by haozi on 6/5/2017.
 */

export interface IError extends Error {
  httpCode: number
  errors: any[]
}
