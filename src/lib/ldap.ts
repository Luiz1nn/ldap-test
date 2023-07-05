import ldap from 'ldapjs'
import { LdapOptions } from '../@types/ldap-options'
import { SearchOptions } from '../@types/search-options'

export function ldapAuth(
  ldapOptions: LdapOptions,
  searchOptions?: SearchOptions,
) {
  const client = ldap.createClient(ldapOptions)

  client.bind(ldapOptions.bindDN, ldapOptions.bindCredentials, (error) => {
    if (error) {
      throw new Error(`Erro na autenticação: ${error}`)
    }

    if (searchOptions) {
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
    }
  })
}
