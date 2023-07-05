import { ldapAuth } from './ldap'

try {
  ldapAuth()
} catch (error) {
  console.error(error)
}
