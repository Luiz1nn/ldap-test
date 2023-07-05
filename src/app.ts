import fastify from 'fastify'
import { ldapAuth } from './lib/ldap'
import { LdapOptions, SearchOptions } from './@types'

export const app = fastify()

const ldapOptions: LdapOptions = {
  url: 'ldap://seu-servidor-ldap:389',
  bindDN: 'cn=seu-usuario,dc=example,dc=com', // DN do usuário para autenticação
  bindCredentials: 'sua-senha', // Senha do usuário
}

const searchOptions: SearchOptions = {
  filter: '(objectClass=person)', // Filtra por objetos do tipo 'person'
  scope: 'sub', // Procura em toda a subárvore
  attributes: ['cn', 'mail'], // Retorna os atributos 'cn' e 'mail'
}

try {
  ldapAuth(ldapOptions, searchOptions)
} catch (error) {
  console.log(error)
}
