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
import { Ref, useCallback, useState } from 'react'
import { useForkedRef } from './useForkedRef'

// This hook is for when a dom node needs to be "seen" in some useEffect logic.
// Since currentElement is state, it will be effective when used in a dependency array
// while a mutable object generated by useRef isn't, and won't.

export function useCallbackRef<T extends HTMLElement = HTMLElement>(
  forwardedRef?: Ref<T>
): [T | null, (node: T | null) => void] {
  const [currentElement, setCurrentElement] = useState<T | null>(null)
  const callbackRef = useCallback((node: T | null) => {
    setCurrentElement(node)
  }, [])
  const forkedRef = useForkedRef<T>(forwardedRef, callbackRef)
  return [currentElement, forkedRef]
}
