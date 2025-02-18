/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import styled, { css } from 'styled-components'
import { StyledIconBase } from '@styled-icons/styled-icon'
import { SpacingSizes } from '@looker/design-tokens'
import {
  Accordion,
  AccordionContent,
  AccordionDisclosureStyle,
} from '../Accordion'
import { listItemBackgroundColor } from '../List/utils'
import { ListItemStatefulWithHoveredProps } from '../List/types'
import { List, ListItem } from '../List'
import { listItemLabelCSS } from '../List/ListItemLabel'
import { IconPlaceholder, IconSize } from '../Icon'
import { AccordionIndicator } from '../Accordion/AccordionDisclosureLayout'
import { TreeItem } from './TreeItem'
import { TreeBranch } from './TreeBranch'
import {
  generateIndent,
  GenerateIndentProps,
  generateTreeBorder,
  iconGapAdjuster,
} from './utils'

interface TreeStyleProps extends ListItemStatefulWithHoveredProps {
  border?: boolean
  branchFontWeight?: boolean
  depth: number
  dividers?: boolean
  forceLabelPadding?: boolean
  iconGap: SpacingSizes
  iconSize: IconSize
  labelBackgroundOnly?: boolean
}

const indicatorContainerSize = 'medium'

export const TreeItemInner = styled(TreeItem)`
  ${listItemLabelCSS(css`
    background-color: transparent;
    padding-left: 0;
  `)}
`

export const TreeItemInnerDetail = styled.div``

const dividersCSS = css`
  ${TreeItem} {
    margin-top: 1px;
  }

  ${AccordionDisclosureStyle} {
    margin-top: 1px;

    ${TreeItemInner} {
      margin-top: 0;
    }
  }
`

interface TreeItemIndentProps extends GenerateIndentProps {
  labelBackgroundOnly: boolean
}

const treeItemIndent = ({
  depth,
  forceLabelPadding,
  iconGap,
  iconSize,
  indicatorSize,
  labelBackgroundOnly,
  theme,
}: TreeItemIndentProps) => {
  const labelPaddingRemoval = css`
    padding: 0;
  `
  const wrapperIndent = css`
    ${generateIndent({
      depth: depth + 2,
      forceLabelPadding,
      iconGap,
      iconSize,
      indicatorSize,
      theme,
    })}
    ${listItemLabelCSS(labelPaddingRemoval)}
  `

  const labelIndent = listItemLabelCSS(
    generateIndent({
      depth: depth + 2,
      forceLabelPadding,
      iconGap,
      iconSize,
      indicatorSize,
      theme,
    })
  )

  return labelBackgroundOnly ? wrapperIndent : labelIndent
}

export const TreeStyle = styled.div<TreeStyleProps>`
  color: ${({ theme }) => theme.colors.text5};
  flex-shrink: 2;
  min-width: 0;

  ${ListItem} {
    ${({ iconGap, theme }) =>
      listItemLabelCSS(css`
        > svg,
        > ${StyledIconBase}, > ${IconPlaceholder} {
          /* The -2px gets the icon gap to match design specs */
          margin-right: calc(${theme.space[iconGap]} - ${iconGapAdjuster});
        }
      `)}
  }

  > ${Accordion} {
    > ${AccordionContent} {
      ${({ border, depth, theme }) =>
        border && generateTreeBorder(depth, indicatorContainerSize, theme)}
    }

    > ${AccordionDisclosureStyle} {
      ${AccordionIndicator} {
        height: ${({ theme }) => theme.sizes[indicatorContainerSize]};
        width: ${({ theme }) => theme.sizes[indicatorContainerSize]};
      }

      ${ListItem} {
        ${({ labelBackgroundOnly, ...restProps }) =>
          labelBackgroundOnly && listItemBackgroundColor(restProps)}
        font-weight: ${({ branchFontWeight, theme: { fontWeights } }) =>
          branchFontWeight ? fontWeights.normal : fontWeights.semiBold};
      }

      ${({ labelBackgroundOnly, ...restProps }) =>
        !labelBackgroundOnly && listItemBackgroundColor(restProps)}

      background-clip: padding-box;
      /**
        Tree's padding-right is handled by the internal item
       */
      padding-right: 0;
      ${({ depth, iconSize, theme }) =>
        generateIndent({
          depth,
          iconGap: 'none',
          iconSize,
          indicatorSize: indicatorContainerSize,
          theme,
        })}
    }
  }

  ${({ dividers }) => dividers && dividersCSS}

  > ${Accordion} > ${AccordionContent} > ${List} {
    > ${ListItem} {
      ${({
        depth,
        forceLabelPadding,
        iconGap,
        iconSize,
        labelBackgroundOnly,
        theme,
      }) =>
        treeItemIndent({
          depth,
          forceLabelPadding,
          iconGap,
          iconSize,
          indicatorSize: indicatorContainerSize,
          labelBackgroundOnly: !!labelBackgroundOnly,
          theme,
        })}
    }

    > ${TreeBranch} {
      ${({ depth, forceLabelPadding, iconGap, iconSize, theme }) =>
        generateIndent({
          depth: depth + 2,
          forceLabelPadding,
          iconGap,
          iconSize,
          indicatorSize: indicatorContainerSize,
          theme,
        })}
    }
  }

  /**
    These selectors are to support TreeArtificial
   */
  > ${List} {
    > ${ListItem} {
      ${({
        depth,
        forceLabelPadding,
        iconGap,
        iconSize,
        labelBackgroundOnly,
        theme,
      }) =>
        treeItemIndent({
          depth,
          forceLabelPadding,
          iconGap,
          iconSize,
          indicatorSize: indicatorContainerSize,
          labelBackgroundOnly: !!labelBackgroundOnly,
          theme,
        })}
    }

    > ${TreeBranch} {
      ${({ depth, forceLabelPadding, iconGap, iconSize, theme }) =>
        generateIndent({
          depth: depth + 2,
          forceLabelPadding,
          iconGap,
          iconSize,
          indicatorSize: indicatorContainerSize,
          theme,
        })}
    }
  }
`
