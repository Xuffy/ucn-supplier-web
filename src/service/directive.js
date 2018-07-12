import Holder from 'holderjs';
import Util from 'service/util';

const authorize = {
  bind(el, binding) {
    if (!Util.$auth(binding.valu)) {
      // el.style.display = 'none';
      el.remove();
    }

  }
}

const holder = {
  bind(el, binding) {
    el.onerror = () => {
      if (!binding.value) {
        el.setAttribute('data-src', 'holder.js/100px100p?auto=yes');
        Holder.run({images: el});
      } else if (Object.prototype.toString.call(binding.value) === '[object Object]') {
        let imageSize = '300x300',
          holderOpts = binding.value;
        if (holderOpts.hasOwnProperty('img')) {
          imageSize = holderOpts.img;
          delete holderOpts['img'];
        }
        let holderStr = '?' + Object.keys(holderOpts).map(function (prop) {
          return [prop, holderOpts[prop]].map(encodeURIComponent).join('=');
        }).join('&');
        el.setAttribute('data-src', 'holder.js/' + imageSize + holderStr);
        Holder.run({
          images: el
        });
      } else if (Object.prototype.toString.call(binding.value) === '[object String]') {
        el.setAttribute('data-src', 'holder.js/' + binding.value);
        Holder.run({
          images: el
        });
      }
    }
  }
}


const image = {
  bind(el, binding, value) {
    console.log(el, binding)
    console.log(el.style, el.clientWidth)
    el.setAttribute('onerror', 'this.src="//iph.href.lu/40x40?text=%E5%9B%BE%E7%89%87&bg=F2F2F2";this.onerror=null');
    /*if (_.indexOf(json, binding.value) === -1) {
      el.style.display = 'none';
    }*/

  }
}


export default {authorize, image, holder};
