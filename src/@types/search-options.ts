export type SearchOptions = {
  filter: string
  scope: 'sub' | 'base' | 'one' | undefined
  attributes: Array<string>
}
