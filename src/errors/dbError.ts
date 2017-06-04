/**
 * Created by haozi on 6/4/2017.
 */

export class DbError extends Error {
  public name = 'DbError'
  public message = '数据库服务炸了'
  public errors: string[] = []
  constructor(message: string[]) {
    super('DbError')
    this.errors = message
  }
}
