const routes = require('../lib/routes')

Object.keys(routes).forEach(scope => {
  Object.keys(routes[scope]).forEach(method => {
    if (routes[scope][method].alias) {
      delete routes[scope][method]
      return
    }

    if (!routes[scope][method].params) {
      return
    }

    Object.keys(routes[scope][method].params).forEach(name => {
      const param = routes[scope][method].params[name]

      if (param.alias) {
        delete routes[scope][method].params[name]
      }
    })
  })
})

require('fs').writeFileSync(require('path').join(__dirname, '..', 'lib', 'routes.json'), JSON.stringify(routes, null, 2) + '\n')
