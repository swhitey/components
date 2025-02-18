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

import { ReactNode } from 'react'
import { AccordionProps } from '../Accordion'
import { ListItemProps } from '../List'

export interface TreeProps
  extends Omit<
      AccordionProps,
      | 'children'
      | 'content'
      | 'indicatorGap'
      | 'indicatorPosition'
      | 'indicatorSize'
    >,
    ListItemProps {
  /**
   * If true, vertical lines will extend from the Tree indicator (and all sub-Trees' indicators)
   * @default false
   */
  border?: boolean
  /**
   * If true, the internal AccordionDisclosure will have fontWeight = 'Normal'
   * @default false
   */
  branchFontWeight?: boolean
  /**
   * Produce a small visual space between each `TreeItem` displayed in the list so adjacent
   * items that are in a "selected" or active state have visual separation.
   * @default false
   */
  dividers?: boolean
  /**
   * If true, child `TreeItem` elements will receive additional indent padding to align parent `Tree` and child `TreeItem` labels.
   * Note: This should only be used when the parent `Tree` has an icon and the child `TreeItem`s do not.
   * @default false
   */
  forceLabelPadding?: boolean
  /**
   * Label text or element displayed within Tree's internal AccordionDisclosure
   */
  label: ReactNode
  /**
   * If true, the following visual changes occur:
   * - TreeItem: Indent padding is not included in background color
   * - Tree: Indicator and indent padding is not included in background color
   */
  labelBackgroundOnly?: boolean
}
