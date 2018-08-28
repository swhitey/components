import tag from 'clean-tag'
import { rem, rgba } from 'polished'
import * as React from 'react'
import { merge, mixed } from 'styled-system'
import styled, { ThemedStyledProps } from '../../styled_components'
import { brandFont } from '../../styles/typography'
import { ThemeInterface } from '../../themes'
import { NamedColor, NamedColors } from '../../themes/theme_colors'
import { SizeLarge, SizeMedium, SizeSmall, SizeXSmall } from '../../types'

export type ButtonSizes = SizeXSmall | SizeSmall | SizeMedium | SizeLarge

export interface ButtonProps {
  /**
   * Defines the color of the button. Can be the string name of a color listed in the color theme, or a color object.
   * @default "primary"
   */
  color?: keyof NamedColors | NamedColor
  /**
   * Defines the size of the button.
   * @default "medium"
   */
  size?: ButtonSizes
  /**
   * Defines the variant or mapping of colors to style properties, like border of the button.
   * @default "default"
   */
  variant?: 'default' | 'outline' | 'transparent'
  /**
   * Optional function to be triggered when a user clicks a button.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'submit' | 'reset' | 'button' | 'menu'
}

type ThemedProps<P> = ThemedStyledProps<P, ThemeInterface>

const variantCommonProps = (color: NamedColor) => {
  return {
    borderStyle: 'solid',
    borderWidth: rem(1),
    // tslint:disable-next-line:object-literal-sort-keys
    '&:focus': {
      boxShadow: `0 0 0 0.15rem ${rgba(color.main, 0.25)}`,
    },
    '&[disabled]': {
      cursor: 'default',
      filter: 'grayscale(0.3)',
      opacity: '0.25',
    },
  }
}

const defaultVariant = (color: NamedColor) => {
  return merge(variantCommonProps(color), {
    background: color.main,
    borderColor: color.main,
    color: color.text,
    // tslint:disable-next-line:object-literal-sort-keys
    '&:hover, &:focus, &.hover': {
      background: color.dark,
      borderColor: color.dark,
    },
    '&:active, &.active': {
      background: color.darker,
      borderColor: color.darker,
    },
    '&[disabled]': {
      '&:hover, &:active, &:focus': {
        backgroundColor: color.main,
        borderColor: color.borderColor,
      },
    },
  })
}

const outlineVariant = (color: NamedColor, props: ThemedProps<ButtonProps>) => {
  return merge(variantCommonProps(color), {
    background: props.theme.colors.white,
    borderColor: color.borderColor,
    color: color.main,
    // tslint:disable-next-line:object-literal-sort-keys
    '&:hover, &:focus, &.hover': {
      background: props.theme.colors.white,
      borderColor: color.main,
      color: color.darker,
    },
    '&:active, &.active': {
      background: color.main,
      borderColor: color.main,
      color: color.text,
    },
    '&[disabled]': {
      '&:hover, &:active, &:focus': {
        backgroundColor: props.theme.colors.white,
        borderColor: color.borderColor,
        color: color.main,
      },
    },
  })
}

const transparentVariant = (
  color: NamedColor,
  props: ThemedProps<ButtonProps>
) => {
  return merge(variantCommonProps(color), {
    background: props.theme.colors.transparent,
    borderColor: props.theme.colors.transparent,
    color: color.main,
    // tslint:disable-next-line:object-literal-sort-keys
    '&:hover, &:focus, &.hover': {
      background: props.theme.colors.transparent,
      borderColor: props.theme.colors.transparent,
      color: color.darker,
    },
    '&:active, &.active': {
      background: color.lighter,
      borderColor: props.theme.colors.transparent,
      color: color.darker,
    },
    '&[disabled]': {
      '&:hover, &:active, &:focus': {
        backgroundColor: props.theme.colors.transparent,
        borderColor: props.theme.colors.transparent,
        color: color.main,
      },
    },
  })
}

const variantHelper = (props: ThemedProps<ButtonProps>) => {
  let color
  if (typeof props.color === 'string' || props.color === undefined) {
    color = props.theme.colors.namedColors[props.color || 'primary']
  } else {
    color = props.color
  }
  switch (props.variant || 'default') {
    case 'transparent':
      return transparentVariant(color, props)
    case 'outline':
      return outlineVariant(color, props)
    case 'default':
    default:
      return defaultVariant(color)
  }
}

function sizeHelper(props: ThemedProps<ButtonProps>) {
  const sizes: Record<ButtonSizes, number[]> = {
    large: [5, 5, 3, 6],
    medium: [3, 3, 3, 4],
    small: [2, 2, 1, 4],
    xsmall: [1, 1, 1, 3],
  }
  const [fontSize, lineHeight, py, px] = sizes[props.size || 'medium']
  return mixed({
    fontSize,
    lineHeight,
    px,
    py,
    theme: props.theme,
  })
}

const InternalButton: React.SFC<ButtonProps> = ({ ...props }) => {
  return <tag.button {...props}>{props.children}</tag.button>
}

export const Button = styled<ButtonProps>(InternalButton)`
  border-radius: ${rem(4)};
  cursor: pointer;
  display: inline-flex;
  font-family: ${brandFont};
  outline: none;
  transition: border 80ms;
  vertical-align: middle;
  white-space: nowrap;
  ${sizeHelper};
  ${variantHelper};
`
