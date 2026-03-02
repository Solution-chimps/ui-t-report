import { SessionStorage } from './session-storage.model';

export class User {
  public user!: string;
  public id?: string;
  public name?: string;
  public password!: string;

  private static usersCache: User[] = [];

  constructor(data: User) {
    Object.assign(this, data)
  }

  public static getUsers(): User[] {
    if (User.usersCache?.length) {
      return User.usersCache;
    }
    let usersData: User[];
    try {
      const userDataStr = import.meta.env.NG_APP_USER_DATA
      if (userDataStr) {
        usersData = (JSON.parse(atob(userDataStr)) as { nickname: string, id: string, name: string }[]).map(user => new User({
          password: '',
          user: user.nickname,
          id: user.id,
          name: user.name
        }));
      }
    } catch (e) {
      console.warn(e);
      usersData = []
    }
    return User.usersCache = import.meta.env.NG_APP_USERS?.split(',').map((data) => {
      const splitted = data.split('@');
      const [user] = splitted;
      const password = splitted.slice(1).join('@');
      const userData = usersData.find(uData => uData.user === user);
      return new User({ user, password, id: userData?.id, name: userData?.name })
    }) ?? []
  }

  public static getUserLogged(): User | undefined {
    if (!User.isUserLoggedIn()) {
      return;
    }
    return SessionStorage.getUser()!;
  }

  public static isUserLoggedIn(): boolean {
    const logged = SessionStorage.getUser();
    if (!logged) {
      return false;
    }
    return this.getUsers().some(user => user.user === logged.user && user.password === logged.password);
  }

}
