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

import React from 'react'
import styled from 'styled-components'
import { AccordionDisclosureStyle } from '../../Accordion'
import { ListItemLabel } from '../../List'
import { TreeItem, Tree } from '..'

export const BorderRadiusOverride = () => (
  <BorderRadiusOverrideTree selected label="Created" defaultOpen dividers>
    <TreeItem selected>Created Date</TreeItem>
    <TreeItem selected>Created Month</TreeItem>
    <TreeItem selected>Created Year</TreeItem>
    <TreeItem selected>Created Quarter</TreeItem>
  </BorderRadiusOverrideTree>
)

const BorderRadiusOverrideTree = styled(Tree)`
  ${AccordionDisclosureStyle},
  ${ListItemLabel} {
    border-radius: ${({ theme }) => theme.radii.medium};
  }
`
