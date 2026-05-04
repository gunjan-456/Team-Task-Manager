module.exports = function (role) {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ msg: "Not authenticated" })
      }

      if (req.user.role !== role) {
        return res.status(403).json({ msg: "Access denied" })
      }

      next()
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}