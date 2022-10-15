/**
 * @en a string in the regex syntax for a back reference, such as \1, \2, etc.
 * @zh 返回back reference语法的字符串，输入 1 -> 输出 \1
 * @explain
 * @en A group can be referenced in the pattern using groupNumber.
 * @zh 可以使用groupNumber去引用之前的group。
 * @example
 * text: 1234123456
 * regex: /(123).?\1/
 * match: 1234123
 * */
export const backReference = (groupNumber: number) => {
  if (groupNumber < 1)
    throw new Error(`Expected group_number must equal or greater than 1, received ${groupNumber}`)

  return `\\${groupNumber}`
}

/**
 * @en Returns a string in the regex syntax for a regex group surrounded by parentheses of the regex strings in regStr
 * @zh 返回一个被圆括号包裹的字符串
 * @explain
 * @en Put a quantifier after the parentheses,it applies to the parentheses as a whole.We can get a part of the match as a separate item in the result array.
 * @zh 将一个量词放在圆括号后，他将把圆括号视为一个整体进行内容匹配。我们可以在结果数组中拿到整个匹配结果。
 * @example
 * text:Gogogo
 * regex:/(go)+/
 * match:gogo
*/
export const group = (regStr: string) => {
  return `(${regStr})`
}

/**
 * @en Return a string in the regex syntax for a positive lookahead assertion of the regex strings in regStr.
 * @zh 返回一个被前看符号包裹的字符串。
 * @explain
 * @en look for somethings but match if it followed the special keyword
 * @zh 查找某个在特定关键字之前的字符串。
 * @example
 * text:hello.good
 * regex:/\w+(?=\.)/
 * match:hello
 */
export const lookahead = (regStr: string) => {
  return `(?=${regStr})`
}

/**
 * @en Returns a string in the regex syntax for a negative lookahead assertion of the regex strings in regStr.
 * @zh 返回一个被非前看符号包裹的字符串。
 * @explain
 * @en look for somethings but match if it NOT followed the special keyword
 * @zh 查找某个不在特定关键字之前的字符串。
 * @example
 * text:hello.good
 * regex:/\w+(?!\.)/
 * match:hell
*/
export const negativeLookahead = (regStr: string) => {
  return `(?!${regStr})`
}
/**
 * @en Return a string in the regex syntax for a positive lookbehind assertion of the regex strings in regStr.
 * @zh 返回一个被后看符号包裹的字符串
 * @explain
 * @en look for somethings but match if it behind the special keyword
 * @zh 查找某个在特定关键字之后的字符串
 * @example
 * text:example@google.com
 * regex:/(?<=@).+/
 * match:google.com
 */
export const lookbehind = (regStr: string) => {
  return `(?<=${regStr})`
}
/**
 * @en Return a string in the regex syntax for a negative lookbehind assertion of the regex strings in regStr.
 * @zh 返回一个被非后看符号包裹的字符串
 * @explain
 * @en look for somethings but match if it NOT behind the special keyword
 * @zh 查找不某个在特定关键字之后的字符串
 * @example
 * text:@google.com
 * regex:/(?<!@)\w+/
 * match:oogle
 */
export const negativeLookBehind = (regStr: string) => {
  return `(?<!${regStr})`
}
export { backReference as backRef, lookahead as positiveLookahead, lookbehind as positiveLookBehind }
