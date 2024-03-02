const paginate = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;

  req.pagination = {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
  };

  next();
};

module.exports = paginate;
