type RegexType = string
const isEmpty = (regex: RegexType) => regex.trim().length === 0
const testEmpty = (regex: RegexType) => {
  if (isEmpty(regex))
    throw new Error('regexStr argument must have at least one nonBlank value')
}
/**
 * @explain
 * @en A group can be referenced in the pattern using groupNumber.
 * @zh 可以使用groupNumber去引用之前的group。
 * @example
 * text: 1234123456
 * regex: /(123).?\1/
 * match: [1234123,123]
 * */
export const backReference = (groupNumber: number) => {
  if (groupNumber < 1) {
    throw new Error(
      `Expected group_number must equal or greater than 1, received ${groupNumber}`,
    )
  }

  return `\\${groupNumber}`
}

/**
 * @explain
 * @en Put a quantifier after the parentheses,it applies to the parentheses as a whole.We can get a part of the match as a separate item in the result array.
 * @zh 将一个量词放在圆括号后，他将把圆括号视为一个整体进行内容匹配。我们可以在结果数组中拿到整个匹配结果。
 * @example
 * text:Gogogo
 * regex:/(go)+/
 * match:[gogo,go]
 */
export const group = (regexStr: RegexType) => {
  return `(${regexStr})`
}

/**
 * @explain
 * @en look for somethings but match if it followed the special keyword
 * @zh 查找某个在特定关键字之前的字符串。
 * @example
 * text:hello.good
 * regex:/\w+(?=\.)/
 * match:[hello]
 */
export const lookahead = (regexStr: RegexType) => {
  return `(?=${regexStr})`
}

/**
 * @explain
 * @en look for somethings but match if it NOT followed the special keyword
 * @zh 查找某个不在特定关键字之前的字符串。
 * @example
 * text:hello.good
 * regex:/\w+(?!\.)/
 * match:[hell]
 */
export const negativeLookahead = (regexStr: RegexType) => {
  return `(?!${regexStr})`
}
/**
 * @explain
 * @en look for somethings but match if it behind the special keyword
 * @zh 查找某个在特定关键字之后的字符串
 * @example
 * text:example@google.com
 * regex:/(?<=@).+/
 * match:[google.com]
 */
export const lookbehind = (regexStr: RegexType) => {
  return `(?<=${regexStr})`
}
/**
 * @explain
 * @en look for somethings but match if it NOT behind the special keyword
 * @zh 查找不某个在特定关键字之后的字符串
 * @example
 * text:@google.com
 * regex:/(?<!@)\w+/
 * match:[oogle]
 */
export const negativeLookBehind = (regexStr: RegexType) => {
  return `(?<!${regexStr})`
}
/**
 * @explain
 * @en Named groups can be referred to by their name rather than their group number.
 * @zh 可以在结果中使用名称而非索引号来访问。
 * @example
 * text:Gogo
 * regex:/(?<token>Go)/
 * match:[Go,Go]&{groups:{token:"Go"}}
 */
export const nameGroup = (name: string, regexStr: RegexType) => {
  if (/^\d/.test(name) || /\W/.test(name)) {
    throw new Error(
      'Name must contain only letters, numbers, and underscore and not start with a number.',
    )
  }

  return `(?<${name}>${regexStr})`
}
/**
 * @explain
 * @en NonCapturing groups are not include in result.
 * @zh 在匹配结果中移除这一组
 * @example
 * text:Gogo
 * regex:/(?:Go)go/
 * match: [Gogo]
 * remove 'Go' group in result array.
 */
export const nonCaptureGroup = (regexStr: RegexType) => {
  return `(?:${regexStr})`
}
/**
 * @explain
 * @en match zero or one string
 * @zh 匹配0个或1个字符
 * @example
 * text:Gogo
 * regex:/Gogos?/
 * match:[Gogo]
 */
export const optional = (regexStr: RegexType) => {
  testEmpty(regexStr)

  return `${regexStr}?`
}
/**
 * @explain
 * @en match one of the string in regexStr.its priority is lower than normal string.
 * @zh 匹配参数数组中的其中一个字符串。他的优先级低于正常连接的字符串。
 * @example
 * text:GgGoogle
 * regex:/Go|go/
 * match:[Go]
 */
export const either = (regexStr: RegexType[]) => {
  return regexStr.join('|')
}
/**
 * @explain
 * @en match a exact number string.
 * @zh 匹配一个精准数量的字符串
 * @example
 * text:good
 * regex:/go{2}/
 * match:[goo]
 */
export const exactly = (quantity: number, regexStr: RegexType) => {
  if (quantity < 0)
    throw new Error(`quantity argument must be a positive int,not ${quantity}`)
  testEmpty(regexStr)
  return `${regexStr}{${quantity}}`
}
/**
 * @explain
 * @en match a string with occurrences in the range
 * @zh 匹配一个出现频率在范围内的字符串
 * @example
 * text:hello
 * regex:/l{1,2}o/
 * match:[llo]
 */
export const between = (min: number, max: number, regexStr: RegexType) => {
  if (min < 0 || max < 0 || min > max)
    throw new Error(`unexpected range ${min},${max}`)

  testEmpty(regexStr)
  return `${regexStr}{${min},${max}}`
}
/**
 * @explain
 * @en match at least 'minimum' occurrence of the string
 * @zh 匹配至少出现minimum次的字符串
 * @example
 * text:google
 * regex:/o{1,}/
 * match:[oo]
 */
export const atLeast = (minimum: number, regexStr: RegexType) => {
  if (minimum < 0)
    throw new Error(`minimum argument must be a positive int,not a ${minimum}`)
  testEmpty(regexStr)
  return `${regexStr}{${minimum},}`
}
// atMost can't work in javascript
// /**
//  * @explain
//  * @en match at most 'maximum' occurrence of the string
//  * @zh 匹配最多出现maximum次的字符串
//  * @example
//  * text:google
//  * regex:/\w{,2}/ig
//  * match:[]
//  */
// export const atMost = (maximum: number, regexStr: RegexType) => {
//   if (maximum < 0)
//     throw new Error(`maximum argument must be a positive int,not a ${maximum}`)
//   if (isEmpty(regexStr))
//     throw new Error('regexStr argument must have at least one nonBlank value')
//   return `${regexStr}{,${maximum}}`
// }
/**
 * @explain
 * @en it tries to make the largest match possible(greedy)
 * @zh 他会尽可能的匹配多的字符（贪婪模式）
 * @example
 * text:google
 * regex:/o*l/
 * match:[ool]
 */
export const zeroOrMore = (regexStr: RegexType) => {
  testEmpty(regexStr)
  return `${regexStr}*`
}
/**
 * @explain
 * @en it tries to make the smallest match possible(lazy)
 * @zh 他会尽可能的匹配更少的字符（懒惰模式）
 * @example
 * text:google
 * regex:/o*?l/
 * match:[ol]
 *
 */
export const zeroOrMoreLazy = (regexStr: RegexType) => {
  testEmpty(regexStr)
  return `${regexStr}*?`
}
/**
 * @explain
 * @en it tries to match as many as possible at least one or more.(greedy)
 * @zh 它尽可能多的匹配至少一个或多个
 * @example
 * text:google
 * regex:/o+l/
 * match:[ool]
 */
export const oneOrMore = (regexStr: RegexType) => {
  testEmpty(regexStr)
  return `${regexStr}+`
}
/**
 * @explain
 * @en it tries to match as least as possible at least one or more.(lazy)
 * @zh 它尽可能少的匹配至少一个或多个
 * @example
 * text:google
 * regex:/o+?l/
 * match:[ol]
 */
export const oneOrMoreLazy = (regexStr: RegexType) => {
  testEmpty(regexStr)
  return `${regexStr}+?`
}
/**
 * @explain
 * @en match at the beginning of the text.
 * @zh 匹配一个regexStr必须出现在开头的字符串
 * @example
 * text:google
 * regex:/^go/
 * match:[go]
 *
 * text:google
 * regex:/^o/
 * match:[]
 */
export const startsWith = (regexStr: RegexType) => {
  return `^${regexStr}`
}
/**
 * @explain
 * @en match at the end of the text.
 * @zh 匹配一个regexStr必须出现在结尾的字符串
 * @example
 * text:google
 * regex:/le$/
 * match:[le]
 *
 * text:google
 * regex:/$l/
 * match:[]
 */
export const endsWith = (regexStr: RegexType) => {
  return `${regexStr}$`
}
/**
 * @explain
 * @en match a isolated string.
 * @zh 匹配一个单独的字符串
 * @example
 * text:google
 * regex:/^google$/
 * match:[google]
 *
 * text:google
 * regex:/^gl$/
 * match:[]
 */
export const startsAndEndsWith = (regexStr: RegexType) => {
  return `^${regexStr}$`
}
/**
 * @explain
 * @en match a string including the characters in tupleOfCharacters.
 * @zh 匹配在tupleOfCharacters字符集里的字符
 * @example
 * text:google
 * regex:/[ol]/
 * match:[o]
 */
export const charts = (tupleOfCharacters: RegexType) => {
  return `[${tupleOfCharacters}]`
}
/**
 * @explain
 * @en match a string excluding the characters in tupleOfCharacters.
 * @zh 匹配不在tupleOfCharacters字符集里的字符
 * @example
 * text:google
 * regex:/[^go]/
 * match::[l]
 */
export const nonCharts = (tupleOfCharacters: RegexType) => {
  return `[^${tupleOfCharacters}]`
}
/**
 * @explain
 * @en match a string may contain group.
 * @zh 匹配一个可能包含组的字符串
 * @example
 * text:google
 * regex:/(goo)?gle/
 * match:[google,goo]
 */
export const optionalGroup = (regexStr: RegexType) => {
  return `(${regexStr})?`
}
/**
 * @explain
 * @en match a string may contain group,the group not appear in result.
 * @zh 匹配一个可能包含组的字符串，这个组不会出现在结果中。
 * @example
 * text:google
 * regex:/(?:goo)?gle/
 * match:[google]
 */
export const optionalNonGroup = (regexStr: RegexType) => {
  return `(?:${regexStr})?`
}
/**
 * @explain
 * @en match a string may contain in group.
 * @zh 匹配一个可能出现在group中的字符串。
 * @example
 * text:google
 * regex:/g(o|l)/
 * match:[go,o]
 * regex:/g(o|l)/g
 * match:[go,gl]
 */
export const groupEither = (regexStr: RegexType[]) => {
  regexStr.forEach(isEmpty)
  return `(${regexStr.join('|')})`
}
/**
 * @explain
 * @en match a string may contain in group,and group don't appear in result.
 * @zh 匹配一个可能出现在group中的字符串，但是group的结果不会出现在数组中。
 * @example
 * text:google
 * regex:/g(?:o|l)/
 * match:[go]
 * regex:/g(?:o|l)/g
 * match:[go,gl]
*/
export const noncapGroupEither = (regexStr: RegexType[]) => {
  regexStr.forEach(isEmpty)
  return `(?:${regexStr.join('|')})`
}
/**
 * @explain
 * @en match a string that occurs a certain quantity of times of regexStr.
 * @zh 匹配regexStr出现特定次数的字符串。
 * @example
 * text:google
 * regex:/(o){2}/
 * match:[oo,o]
*/
export const groupExactly = (quantity: number, regexStr: RegexType) => {
  if (quantity < 0)
    throw new Error('quantity must be a positive int')

  return `(${regexStr}){${quantity}}`
}
/**
 * @explain
 * @en match a string that occurs a certain quantity of times of regexStr, and ignore the group in result.
 * @zh 匹配regexStr出现特定次数的字符串，并且在结果中忽略这个组。
 * @example
 * text:google
 * regex:/(o){2}/
 * match:[oo]
*/
export const noncapGroupExactly = (quantity: number, regexStr: RegexType) => {
  if (quantity < 0)
    throw new Error('quantity must be a positive int')

  return `(?:${regexStr}){${quantity}}`
}
/**
 * @explain
 * @en match a string where the number of occurrences of regexStr is in the range (minimum, maximum).
 * @zh 匹配出现regexStr出现次数为(minimum,maximum)范围的字符串。
 * @example
 * text:google
 * regex:/(o){1,2}/
 * match:[oo,o]
*/
export const groupBetween = (minimum: number, maximum: number, regexStr: RegexType) => {
  if (minimum < 0)
    throw new Error(`minimum must be a positive int,received ${minimum}`)
  if (maximum < 0)
    throw new Error(`maximum must be a positive int, received ${maximum}`)
  if (minimum > maximum)
    throw new Error('minimum must less than maximum')
  return `(${regexStr}){${minimum},${maximum}}`
}
/**
 * @explain
 * @en match a string where the number of occurrences of regexStr is in the range (minimum, maximum), and ignore the group in result.
 * @zh 匹配出现regexStr出现次数为(minimum,maximum)范围的字符串，并且在结果中忽略这个组。
 * @example
 * text:google
 * regex:/(?:o){1,2}/
 * match:[oo]
*/
export const nonGroupBetween = (minimum: number, maximum: number, regexStr: RegexType) => {
  if (minimum < 0)
    throw new Error(`minimum must be a positive int,received ${minimum}`)
  if (maximum < 0)
    throw new Error(`maximum must be a positive int, received ${maximum}`)
  if (minimum > maximum)
    throw new Error('minimum must less than maximum')
  return `(?:${regexStr}){${minimum},${maximum}}`
}
/**
 * @explain
 * @en match a string where occur at least "minimum" quantity of regexStr.
 * @zh 匹配regexStr出现至少minimum次数的字符串。
 * @example
 * text:google
 * regex:/(o){1,}/
 * match:[oo]
 */
export const groupAtLeast = (minimum: number, regexStr: RegexType) => {
  if (minimum < 0)
    throw new Error(`minimum must be a positive int,received ${minimum}`)
  return `(${regexStr}){${minimum},}`
}
/**
 * @explain
 * @en match a string where occur at least "minimum" quantity of regexStr, and ignore the group in result.
 * @zh 匹配regexStr出现至少minimum次数的字符串，并且在结果中忽略这个组。
 * @example
 * text:google
 * regex:/(o){1,}/
 * match:[oo]
 */
export const noncapGroupAtLeast = (minimum: number, regexStr: RegexType) => {
  if (minimum < 0)
    throw new Error(`minimum must be a positive int,received ${minimum}`)
  return `(?:${regexStr}){${minimum},}`
}

/**
 * @explain
 * @en match a string where occur at most "maximum" quantity of regexStr.
 * @zh 匹配regexStr至多出现maximum次数的字符串。
 * @example
 * text:google
 * regex:/(o){1,}/
 * match:[oo]
 */
export const groupAtMost = (maximum: number, regexStr: RegexType) => {
  if (maximum < 0)
    throw new Error(`maximum must be a positive int,received ${maximum}`)
  return `(${regexStr}){,${maximum}}`
}
/**
 * @explain
 * @en match a string where occur at most "maximum" quantity of regexStr, and ignore the group in result.
 * @zh 匹配regexStr至多出现maximum次数的字符串，并且在结果中忽略这个组。
 * @example
 * text:google
 * regex:/(o){1,}/
 * match:[oo]
 */
export const noncapGroupAtMost = (maximum: number, regexStr: RegexType) => {
  if (maximum < 0)
    throw new Error(`maximum must be a positive int,received ${maximum}`)
  return `(?:${regexStr}){,${maximum}}`
}
/**
 * @explain
 * @en match a string that may contain regexStr.
 * @zh 匹配一个可能包含regexStr的字符串
 * @example
 * text:google
 * regex:/g(o)*g/
 * match:[goog,o]
 * regex:/(o)*g/
 * match:[g,undefined]
 */
export const zeroOrMoreGroup = (regexStr: RegexType) => {
  return `(${regexStr})*`
}
/**
 * @explain
 * @en match a string that may contain regexStr, and ignore the group in result.
 * @zh 匹配一个可能包含regexStr的字符串，并且在结果中忽略这个组。
 * @example
 * text:google
 * regex:/g(?:o)*g/
 * match:[goog]
 * regex:/(?:o)*g/
 * match:[g]
 */
export const zeroOrMoreNoncapGroup = (regexStr: RegexType) => {
  return `(?:${regexStr})*`
}
/**
 * @explain
 * @en match a string that may contain fewer regexStr.(Lazy Mode)
 * @zh 匹配一个可能包含更少的regexStr的字符串。(懒惰模式)
 * @example
 * text:google
 * regex:/g(o)*?/
 * match:[g,undefined]//because as long as match 'g', the condition is satisfied.
*/
export const zeroOrMoreLazyGroup = (regexStr: RegexType) => {
  return `(${regexStr})*?`
}
/**
 * @explain
 * @en match a string that may contain fewer regexStr,and ignore the group in result.(Lazy Mode)
 * @zh 匹配一个可能包含更少的regexStr的字符串，并且在结果中忽略这个组。(懒惰模式)
 * @example
 * text:google
 * regex:/g(?:o)*?/
 * match:[g]
*/
export const zeroOrMoreLazyNoncapGroup = (regexStr: RegexType) => {
  return `(?:${regexStr})*?`
}
/**
 * @explain
 * @en match a string that contain at least one regexStr.
 * @zh 匹配至少包含一个regexStr的字符串。
 * @example
 * text:google
 * regex:/(o)+/
 * match:[oo,o]
 */
export const oneOrMoreGroup = (regexStr: RegexType) => {
  return `(${regexStr})+`
}
/**
 * @explain
 * @en match a string that contain at least one regexStr, ignore the group in result.
 * @zh 匹配至少包含一个regexStr的字符串，并且在结果中忽略这个组
 * @example
 * text:google
 * regex:/(?:o)+/
 * match:[oo]
 */
export const oneOrMoreNoncapGroup = (regexStr: RegexType) => {
  return `(?:${regexStr})+`
}
/**
 * @explain
 * @en match a string that contain at least one but more fewer regexStr.(**Lazy Mode**)
 * @zh 匹配至少包含一个但更少的regexStr的字符串。(**懒惰模式**)
 * @example
 * text:google
 * regex:/(o)+?/
 * match:[o,o]
 */
export const oneOrMoreLazyGroup = (regexStr: RegexType) => {
  return `(${regexStr})+?`
}
/**
 * @explain
 * @en match a string that contain at least one but more fewer regexStr, ignore the group in result.(**Lazy Mode**)
 * @zh 匹配至少包含一个但更少的regexStr的字符串，并且regexStr不会出现在结果当中。(**懒惰模式**)
 * @example
 * text:google
 * regex:/(?:o)+?/
 * match:[o]
 */
export const oneOrMoreLazyNoncapGroup = (regexStr: RegexType) => {
  return `(?:${regexStr})+?`
}
/**
 * @explain
 * @en match a string that contain param.
 * @zh 匹配一个包含参数的字符串。
 * @example
 * text:google
 * regex:/([go])/
 * match:[g,g]
*/
export const groupChars = (tupleOfCharacters: string) => {
  return `([${tupleOfCharacters}])`
}
/**
 * @explain
 * @en match a string that contain param,and ignore the group in result.
 * @zh 匹配一个包含参数的字符串，并且在结果中忽略这个组。
 * @example
 * text:google
 * regex:/(?:[go])/
 * match:[g]
*/
export const noncapGroupChars = (tupleOfCharacters: string) => {
  return `(?:[${tupleOfCharacters}])`
}
/**
 * @explain
 * @en match a string that don't contain param.
 * @zh 匹配一个不包含参数的字符串
 * @example
 * text:google
 * regex:/([^go])/
 * match:[l,l]
*/
export const groupNonChars = (tupleOfCharacters: string) => {
  return `([^${tupleOfCharacters}])`
}
/**
 * @explain
 * @en match a string that don't contain param,and ignore the group in result.
 * @zh 匹配一个不包含参数的字符串，并且在结果中忽略这个组。
 * @example
 * text:google
 * regex:/(?:[^go])/
 * match:[l]
*/
export const noncapGroupNonChars = (tupleOfCharacters: string) => {
  return `(?:[^${tupleOfCharacters}])`
}
export {
  backReference as backRef,
  lookahead as positiveLookahead,
  lookbehind as positiveLookBehind,
  charts as include,
  nonCharts as notInclude,
}
