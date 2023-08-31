// 先导入图标，再使用
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faList, faChalkboard, faUser, faCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons'

library.add(faList, faCircle, faChalkboard, faUser, faFaceSmile, faSpinner)

/**
 * 注册 FontAwesomeIcon 组件
 * @param {Vue} app vue实例
 * @see https://fontawesome.com/
 * @example
 * <font-awesome-icon icon="file-alt" size="2x" />
 * <font-awesome-icon :icon=['fa', 'file-alt'] />
 */
export default app => {
  app.component('font-awesome-icon', FontAwesomeIcon)
}
