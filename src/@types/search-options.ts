import { Filter } from 'ldapjs'

export type SearchOptions = {
  filter?: string | Filter
  scope?: 'sub' | 'base' | 'one'
  attributes?: string | string[]
}
