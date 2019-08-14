import { ThemedProps } from '../types'
import { css } from './styled_components'
import { Theme } from './theme'

export type TextTransforms = 'caps' | 'lower' | 'none' | 'upper'
export type TextVariants =
  | 'critical'
  | 'positive'
  | 'secondary'
  | 'subdued'
  | 'inverted'

export const reset = <P>(props: ThemedProps<P>) => props.theme.reset()

export const shouldTruncate = (doTruncate: boolean) => {
  if (doTruncate) {
    return css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `
  }
  return ``
}

export const getTextTransform = (transform: TextTransforms | undefined) => {
  switch (transform) {
    case 'upper':
      return css`
        text-transform: uppercase;
      `
    case 'lower':
      return css`
        text-transform: lowercase;
      `
    case 'caps':
      return css`
        text-transform: capitalize;
      `
    case 'none':
    default:
      return css`
        text-transform: none;
      `
  }
}

export const textVariant = (theme: Theme, variant?: TextVariants) => {
  switch (variant) {
    case 'critical':
      return css`
        color: ${theme.colors.palette.red500};
      `
    case 'positive':
      return css`
        color: ${theme.colors.palette.green500};
      `
    case 'secondary':
      return css`
        color: ${theme.colors.palette.charcoal500};
      `
    case 'subdued':
      return css`
        color: ${theme.colors.palette.charcoal400};
      `
    case 'inverted':
      return css`
        color: ${theme.colors.palette.textInverted};
      `
    default:
      return false
  }
}
