Function.prototype.myApply = function (context, args) {
      context = context === null || context === undefined ? window : Object(context)

      context.fn = this
      context.fn(...args)

      delete context.fn
    }

    Function.prototype.mtCall = function (context, ...args) {
      context = context === null || context === undefined ? window : Object(context)

      context.fn = this
      context.fn(...args)

      delete context.fn
    }