export interface ICompany {
  cnpj: string
  razao_social: string
  nome_fantasia: string
  situacao_cadastral: string
  data_situacao_cadastral: string
  matriz_filial: string
  data_inicio_atividade: string
  cnae_principal: string
  cnaes_secundarios: string[]
  natureza_juridica: string
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cep: string
  uf: string
  municipio: string
  email: string
  telefones: Telefone[]
  capital_social: string
  porte_empresa: string
  opcao_simples: string
  data_opcao_simples: string
  opcao_mei: string
  data_opcao_mei: string
  QSA: Qsa[]
}

export interface Telefone {
  ddd: string
  numero: string
  is_fax: boolean
}

export interface Qsa {
  nome_socio: string
  cnpj_cpf_socio: string
  qualificacao_socio: string
  data_entrada_sociedade: string
  identificador_socio: string
  faixa_etaria: string
}
