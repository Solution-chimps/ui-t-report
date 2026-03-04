import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Classe abstrata base para serviços HTTP.
 *
 * Centraliza operações comuns de comunicação com API REST,
 * promovendo reutilização, padronização e redução de código repetitivo.
 *
 * @template T Tipo da entidade manipulada.
 * @template ID Tipo do identificador (default: number).
 *
 * @abstract
 */
export abstract class AbstractHttpService<T, ID = number> {

  protected readonly cache = new Map<string, T>()

  /**
   * Endpoint base da entidade.
   *
   * Exemplo:
   * `/api/users`
   *
   * @protected
   */
  protected abstract readonly endpoint: string;

  protected readonly http = inject(HttpClient)

  // =====================================================
  // ======================== GET ========================
  // =====================================================

  /**
   * Busca todos os registros.
   *
   * @param {Record<string, any>} [query]
   * @returns {Observable<T[]>}
   */
  public findAll(query?: Record<string, any>): Observable<T[]> {
    return this.http.get<T[]>(
      this.endpoint,
      { params: this.buildParams(query) }
    );
  }

  /**
   * Busca por ID.
   *
   * @param {ID} id
   * @returns {Observable<T>}
   */
  public findById(id: ID): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }

  /**
 * Executa requisição HTTP GET.
 *
 * Pode ser utilizado para endpoints customizados
 * além dos métodos CRUD padrão.
 *
 * Exemplo:
 *
 * ```ts
 * this.get<User[]>('/users/active');
 * this.get<Page<User>>('/users', { page: 0, size: 10 });
 * ```
 *
 * @template R Tipo do retorno esperado
 * @param {string} path Caminho relativo ao endpoint base
 * @param {Record<string, any>} [query] Parâmetros de query
 * @param {Record<string, string>} [headers] Headers adicionais
 * @returns {Observable<R>}
 */
  public get<R>(
    path: string,
    query?: Record<string, any>,
  ): Observable<R> {

    return this.http.get<R>(
      `${this.endpoint}${path}`,
      {
        params: this.buildParams(query),
      }
    );
  }

  // =====================================================
  // ======================= CREATE ======================
  // =====================================================

  /**
   * Cria novo registro.
   *
   * @param {Partial<T>} payload
   * @returns {Observable<T>}
   */
  public create(payload: Partial<T>): Observable<T> {
    return this.http.post<T>(this.endpoint, payload);
  }

  // =====================================================
  // ======================= UPDATE ======================
  // =====================================================

  /**
   * Atualiza registro existente.
   *
   * @param {ID} id
   * @param {Partial<T>} payload
   * @returns {Observable<T>}
   */
  public update(id: ID, payload: Partial<T>): Observable<T> {
    return this.http.put<T>(
      `${this.endpoint}/${id}`,
      payload
    );
  }

  /**
   * Atualização parcial (PATCH).
   *
   * @param {ID} id
   * @param {Partial<T>} payload
   * @returns {Observable<T>}
   */
  public patch(id: ID, payload: Partial<T>): Observable<T> {
    return this.http.patch<T>(
      `${this.endpoint}/${id}`,
      payload
    );
  }

  // =====================================================
  // ======================= DELETE ======================
  // =====================================================

  /**
   * Remove registro por ID.
   *
   * @param {ID} id
   * @returns {Observable<void>}
   */
  public delete(id: ID): Observable<void> {
    return this.http.delete<void>(
      `${this.endpoint}/${id}`
    );
  }

  // =====================================================
  // ===================== PROTECTED =====================
  // =====================================================

  /**
   * Constrói HttpParams a partir de objeto simples.
   *
   * @protected
   * @param {Record<string, any>} [query]
   * @returns {HttpParams}
   */
  protected buildParams(query?: Record<string, any>): HttpParams {

    let params = new HttpParams();

    if (!query) return params;

    Object.keys(query).forEach(key => {
      const value = query[key];

      if (value !== null && value !== undefined) {
        params = params.set(key, String(value));
      }
    });

    return params;
  }

  /**
   * Permite sobrescrever headers padrão.
   *
   * @protected
   * @returns {HttpHeaders}
   */
  protected buildHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
}
