/**
 * Created by haozi on 6/22/2017.
 */
import {IUser, userModule} from '../../database/schemas/user'

export default class {
  private users: IUser[]

  constructor() {

  }
  public async loadUsers() {
    this.users = await userModule.find({})
  }

  /**
   * 使用用户名查询用户
   * @param username
   * @returns {IUser}
   */
  public getUser(username: string) {
    for (let i = 0; i < this.users.length ; i++) {
      if (this.users[i].name === username) {
        return this.users[i]
      }
    }
  }
  public getAllUser(): IUser[] {
    return this.users
  }
}
