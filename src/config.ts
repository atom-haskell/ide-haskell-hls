export type Type = 'array' | 'string' | 'boolean' | 'object' | 'integer'
export type ItemType = Type | never
export type TypedConfig<
  T extends Type = Type,
  U extends Type | never = Type
> = TypedProps<T, U> & {
  type: T
}
interface BasicProps<T extends Type> {
  title: string
  order: number
  type: T
  description?: string
}
type TypeFromTypeDesc<T extends Type, U extends ItemType> = T extends 'string'
  ? string
  : T extends 'boolean'
  ? boolean
  : T extends 'object'
  ? IConfig
  : T extends 'integer'
  ? number
  : T extends 'array'
  ? ReadonlyArray<U>
  : never
type EnumDesc<T> =
  | ReadonlyArray<T>
  | ReadonlyArray<{ value: T; description: string }>
interface StringProps {
  enum?: EnumDesc<string>
  default: string
}
interface IntProps {
  minimum?: number
  maximum?: number
  default: number
  enum?: EnumDesc<number>
}
interface ArrayProps<U extends Type> {
  items: {
    type: U
  }
  default: ReadonlyArray<TypeFromTypeDesc<U, never>>
  enum?: EnumDesc<ReadonlyArray<TypeFromTypeDesc<U, never>>>
}
interface ObjectProps {
  properties: IConfig
}
interface BoolProps {
  default: boolean
  enum?: EnumDesc<boolean>
}
type TypedProps<T extends Type, U extends ItemType> = BasicProps<T> &
  (T extends 'string'
    ? StringProps
    : T extends 'boolean'
    ? BoolProps
    : T extends 'object'
    ? ObjectProps
    : T extends 'integer'
    ? IntProps
    : T extends 'array'
    ? ArrayProps<U>
    : never)
export interface IConfig {
  [key: string]: TypedConfig
}
export type Obj = TypedConfig<'object'>
export type Str = TypedConfig<'string'>
export type Bool = TypedConfig<'boolean'>
export type Int = TypedConfig<'integer'>
export type Arr<U extends Type> = TypedConfig<'array', U>

export const config: IConfig = {
  haskell: <Obj>{
    type: 'object',
    title: 'Haskell Language Server Settings',
    order: 0,
    properties: {
      // Formatting provider (haskell.formattingProvider, default ormolu): what formatter to use; one of floskell, ormolu, fourmolu, stylish-haskell, or brittany (if compiled with AGPL)
      formattingProvider: <Str>{
        title: 'Formatting provider',
        description: 'what formatter to use',
        type: 'string',
        order: 10,
        enum: ['floskell', 'ormolu', 'fourmolu', 'stylish-haskell', 'brittany'],
        default: 'ormolu',
      },
      // Format on imports (haskell.formatOnImportOn, default true): whether to format after adding an import
      formatOnImportOn: <Bool>{
        title: 'Format on imports',
        description: 'whether to format after adding an import',
        type: 'boolean',
        order: 20,
        default: true,
      },
      // Maximum number of problems to report (haskell.maxNumberOfProblems, default 100): the maximum number of problems the server will send to the client
      maxNumberOfProblems: <Int>{
        title: 'Maximum number of problems to report',
        description:
          'the maximum number of problems the server will send to the client',
        type: 'integer',
        order: 30,
        default: 100,
      },
      // Diagnostics on change (haskell.diagnosticsOnChange, default true): (currently unused)
      diagnosticsOnChange: <Bool>{
        title: 'Diagnostics on change',
        description: '(currently unused)',
        type: 'boolean',
        order: 40,
        default: true,
      },
      // Completion snippets (haskell.completionSnippetsOn, default true): whether to support completion snippets
      completionSnippetsOn: <Bool>{
        title: 'Completion snippets',
        description: 'whether to support completion snippets',
        type: 'boolean',
        order: 50,
        default: true,
      },
      // Liquid Haskell (haskell.liquidOn, default false): whether to enable Liquid Haskell support (currently unused until the Liquid Haskell support is functional again)
      liquidOn: <Bool>{
        title: 'Liquid Haskell',
        description:
          'whether to enable Liquid Haskell support (currently unused until the Liquid Haskell support is functional again)',
        type: 'boolean',
        order: 60,
        default: false,
      },
      // Hlint (haskell.hlintOn, default true): whether to enable Hlint support
      hlintOn: <Bool>{
        title: 'Hlint',
        description: 'whether to enable Hlint support',
        type: 'boolean',
        order: 70,
        default: true,
      },
      // Max completions (haskell.maxCompletions, default 40): maximum number of completions sent to the LSP client.
      maxCompletions: <Int>{
        title: 'Hlint',
        description: 'maximum number of completions sent to the LSP client',
        type: 'integer',
        order: 80,
        default: 40,
      },
    },
  },
}
