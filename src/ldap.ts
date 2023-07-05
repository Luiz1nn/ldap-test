import ldap from 'ldapjs'
import { LdapOptions } from './@types/ldap-options'
import { SearchOptions } from './@types/search-options'

const ldapOptions: LdapOptions = {
  url: 'ldap://seu-servidor-ldap:389',
  bindDN: 'cn=seu-usuario,dc=example,dc=com', // DN do usuário para autenticação
  bindCredentials: 'sua-senha', // Senha do usuário
}

export function ldapAuth() {
  const client = ldap.createClient(ldapOptions)

  client.bind(ldapOptions.bindDN, ldapOptions.bindCredentials, (error) => {
    if (error) {
      throw new Error(`Erro na autenticação: ${error}`)
    }

    const searchOptions: SearchOptions = {
      filter: '(objectClass=person)', // Filtra por objetos do tipo 'person'
      scope: 'sub', // Procura em toda a subárvore
      attributes: ['cn', 'mail'], // Retorna os atributos 'cn' e 'mail'
    }

    client.search(
      'dc=example,dc=com',
      searchOptions,
      (searchError, searchResponse) => {
        if (searchError) {
          throw new Error(`Erro na pesquisa: ${searchError}`)
        }

        searchResponse.on('searchEntry', (entry) => {
          console.log('Resultado: ', entry)
        })

        searchResponse.on('error', (error) => {
          console.error('Erro na pesquisa', error)
        })

        searchResponse.on('end', () => {
          client.unbind()
        })
      },
    )
  })
}
