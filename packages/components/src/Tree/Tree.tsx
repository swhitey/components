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

import styled from 'styled-components'
import React, {
  FC,
  KeyboardEvent,
  MouseEvent,
  useContext,
  useRef,
  useState,
} from 'react'
import { Accordion } from '../Accordion'
import { undefinedCoalesce, useWrapEvent } from '../utils'
import { List } from '../List'
import { listItemDimensions, getDetailOptions } from '../List/utils'
import { TreeContext } from './TreeContext'
import { indicatorDefaults } from './utils'
import { TreeItemInner, TreeItemInnerDetail, TreeStyle } from './TreeStyle'
import { TreeProps } from './types'

const TreeLayout: FC<TreeProps> = ({
  branchFontWeight,
  border: propsBorder,
  children,
  className,
  color,
  density: propsDensity,
  detail: propsDetail,
  disabled,
  dividers,
  forceLabelPadding,
  icon,
  keyColor: propsKeyColor,
  label: propsLabel,
  labelBackgroundOnly: propsLabelBackgroundOnly,
  onClick,
  onKeyUp,
  onMouseEnter,
  onMouseLeave,
  selected,
  truncate,
  ...restProps
}) => {
  const detailRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const treeContext = useContext(TreeContext)
  const hasBorder = undefinedCoalesce([propsBorder, treeContext.border])
  const useKeyColor = undefinedCoalesce([propsKeyColor, treeContext.keyColor])
  const hasLabelBackgroundOnly = undefinedCoalesce([
    propsLabelBackgroundOnly,
    treeContext.labelBackgroundOnly,
  ])
  const startingDepth = 0
  const depth = treeContext.depth ? treeContext.depth : startingDepth

  const density = propsDensity || treeContext.density
  const { iconGap, iconSize } = listItemDimensions(density)

  const { accessory, content, hoverDisclosure } = getDetailOptions(propsDetail)

  const handleDetailClick = (event: MouseEvent<HTMLElement>) => {
    if (
      accessory &&
      detailRef.current &&
      detailRef.current.contains(event.target as Node)
    ) {
      event.stopPropagation()
    }
  }

  const handleDetailKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (
      accessory &&
      detailRef.current &&
      detailRef.current.contains(event.target as Node)
    ) {
      event.stopPropagation()
    }
  }

  const handleMouseEnter = useWrapEvent(() => setHovered(true), onMouseEnter)
  const handleMouseLeave = useWrapEvent(() => setHovered(false), onMouseLeave)

  const detail = {
    content: (
      <TreeItemInnerDetail
        onClick={handleDetailClick}
        onKeyDown={handleDetailKeyDown}
        ref={detailRef}
      >
        {content}
      </TreeItemInnerDetail>
    ),
    options: {
      accessory,
      hoverDisclosure,
    },
  }

  const label = (
    <TreeItemInner
      color={color}
      density={density}
      detail={detail}
      disabled={disabled}
      icon={icon}
      truncate={truncate}
    >
      {propsLabel}
    </TreeItemInner>
  )

  const indicatorColor = disabled ? 'text1' : color
  const innerAccordion = (
    <Accordion
      content={
        <List density={density} windowing="none">
          {children}
        </List>
      }
      color={indicatorColor}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      py="none"
      {...indicatorDefaults}
      {...restProps}
    >
      {label}
    </Accordion>
  )

  return (
    <TreeContext.Provider
      value={{
        border: hasBorder,
        density,
        depth: depth + 1,
        keyColor: useKeyColor,
        labelBackgroundOnly: hasLabelBackgroundOnly,
      }}
    >
      <TreeStyle
        border={hasBorder}
        branchFontWeight={branchFontWeight}
        className={className}
        depth={depth}
        disabled={disabled}
        dividers={dividers}
        forceLabelPadding={forceLabelPadding}
        hovered={hovered}
        iconGap={iconGap}
        iconSize={iconSize}
        keyColor={useKeyColor}
        labelBackgroundOnly={hasLabelBackgroundOnly}
        selected={selected}
      >
        {innerAccordion}
      </TreeStyle>
    </TreeContext.Provider>
  )
}

export const Tree = styled(TreeLayout)``
