import { User } from './user.model';

/**
 * Serviço utilitário para gerenciamento do sessionStorage.
 *
 * - Serializa automaticamente objetos para JSON.
 * - Faz parse automático ao recuperar.
 * - Permite tipagem genérica.
 * - Suporta expiração opcional (TTL).
 */
export class SessionStorage {

  /**
   * Salva um valor no sessionStorage.
   *
   * @param key Chave de armazenamento.
   * @param value Valor a ser armazenado.
   * @param ttl Tempo de expiração em milissegundos (opcional).
   */
  public static set<T>(key: string, value: T, ttl?: number): void {
    const data = {
      value,
      expiry: ttl ? Date.now() + ttl : null
    };

    sessionStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Recupera um valor do sessionStorage.
   *
   * @param key Chave de armazenamento.
   * @returns Valor tipado ou null se não existir ou estiver expirado.
   */
  public static get<T = string>(key: string): T | null {
    const item = sessionStorage.getItem(key);

    if (!item) return null;

    try {
      const data = JSON.parse(item);

      if (data.expiry && Date.now() > data.expiry) {
        sessionStorage.removeItem(key);
        return null;
      }

      return data.value as T;
    } catch {
      return null;
    }
  }

  /**
   * Remove um item específico.
   *
   * @param key Chave a ser removida.
   */
  public static remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * Limpa todo o sessionStorage.
   */
  public static clear(): void {
    sessionStorage.clear();
  }

  /**
   * Verifica se uma chave existe.
   *
   * @param key Chave a ser verificada.
   */
  public static has(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }

  /**
   * Remove a chave de usuario do session storage
   *
   * @static
   * @memberof SessionStorage
   */
  public static logout(): void {
    SessionStorage.remove('USER');
  }

  /**
   * Armazena os dados do usuário no armazenamento da sessão
   *
   * @static
   * @param {User} data
   * @memberof SessionStorage
   */
  public static setUser(data: User): void {
    SessionStorage.set('USER', btoa(JSON.stringify(data)))
  }

  /**
   * Retorna os dados do usuário
   *
   * @static
   * @return {*}  {(User | null)}
   * @memberof SessionStorage
   */
  public static getUser(): User | null {
    const data = SessionStorage.get('USER');
    if (!data) {
      return null;
    }
    return JSON.parse(atob(data)) as User
  }
}
