export default {
  email: {
    key: 'email',
    _rules: {
      type: 'Email',
      required: true
    }
  },
  userName: {
    key: 'userName',
    _rules: {
      required: true
    }
  },
  lang: {
    key: 'lang',
    _rules: {
      required: true
    }
  },
  tel: {
    key: 'tel',
    _rules: {
      type: 'Number',
      required: true
    }
  },
  gender: {
    key: 'gender',
    _rules: {
      required: true
    }
  },
  department: {
    key: 'deptId',
    _rules: {
      required: true
    }
  },
  role: {
    key: 'roleId',
    _rules: {
      required: true
    }
  },
  birthday: {
    key: 'birthday',
  },
  remark: {
    key: 'remark',
  }
}
