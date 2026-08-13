// 语录选项格式的前缀和后缀
export const OPTIONS_DATA_FORMAT = {
  PREFIX: 'CelestialQuoteOptionNewDataFormat', // 前缀
  PREFIX_OLD: 'CelestialQuoteOptionDataFormat', // 旧版前缀
  SUFFIX: 'EndOfCelestialQuoteOptionData', // 后缀
}

// 新版格式的正则表达式
export const IMPORTED_OPTION_REGEXP = new RegExp(
  `^${OPTIONS_DATA_FORMAT.PREFIX}(.*)${OPTIONS_DATA_FORMAT.SUFFIX}$`,
)

// 旧版格式的正则表达式
export const IMPORTED_OPTION_OLD_REGEXP = new RegExp(
  `^${OPTIONS_DATA_FORMAT.PREFIX_OLD}(.*)${OPTIONS_DATA_FORMAT.SUFFIX}$`,
)

// 匹配两种版本格式的正则表达式
export const IMPORTED_OPTION_COMPAT_REGEXP = new RegExp(
  `^(${IMPORTED_OPTION_REGEXP.source}|${IMPORTED_OPTION_OLD_REGEXP.source})$`,
)
