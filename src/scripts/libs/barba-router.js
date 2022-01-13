!function (t, i) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (t = t || self).barbaRouter = i()
}(this, (function () {
    var t = "2.1.10";
    return new (function () {
        function i() {
            this.name = "@barba/router", this.version = t, this.routeNames = [], this.routesByName = {}
        }

        var n = i.prototype;
        return n.install = function (t, i) {
            var n = this, e = (void 0 === i ? {} : i).routes, o = void 0 === e ? [] : e;
            this.logger = new t.Logger(this.name), this.logger.info(this.version), this.barba = t, o.forEach((function (t) {
                var i = t.name, e = t.path, o = [], r = n.barba.helpers.pathToRegexp(e, o);
                n.routeNames.indexOf(i) > -1 ? console.warn("[@barba/router] Duplicated route name (" + i + ")") : (n.routeNames.push(i), n.routesByName[i] = {
                    keys: o,
                    path: e,
                    regex: r
                })
            })), t.schemaPage.route = void 0
        }, n.init = function () {
            this.barba.transitions.store.add("rule", {
                position: 1,
                value: {name: "route", type: "object"}
            }), this.barba.hooks.page(this.resolveRoutes, this), this.barba.hooks.reset(this.resolveRoutes, this)
        }, n.resolveUrl = function (t) {
            for (var i = this, n = this.barba.url.parse(t).path, e = {name: name, params: {}}, o = function (t, o) {
                var r = i.routeNames[t], s = i.routesByName[r], u = s.keys, f = s.regex.exec(n);
                if (null !== f) return e.name = r, u.forEach((function (t, i) {
                    e.params[t.name] = f[i + 1]
                })), {v: e}
            }, r = 0, s = this.routeNames.length; r < s; r++) {
                var u = o(r);
                if ("object" == typeof u) return u.v
            }
            return null
        }, n.resolveRoutes = function (t) {
            var i = t.current, n = t.next;
            i.route = i.url.href ? this.resolveUrl(i.url.href) : void 0, n.route = n.url.href ? this.resolveUrl(n.url.href) : void 0
        }, i
    }())
}));
//# sourceMappingURL=barba-router.umd.js.map
