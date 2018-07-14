import Util from 'service/util';

/**
 * Ȩ����֤
 * @type {{bind(*, *): void}}
 */
const authorize = {
  bind(el, binding) {
    if (!Util.$auth(binding.value)) {
      el.remove();
    }

  }
}


export default {authorize};
