async function getPaginatedData(Model, query, paginationOptions) {
  const { skip, limit, page, pageSize } = paginationOptions;

  const [data, total] = await Promise.all([
    Model.find(query).skip(skip).limit(limit),
    Model.countDocuments(query),
  ]);

  return {
    currentPage: page,
    totalPages: Math.ceil(total / pageSize),
    totalData: total,
    data,
  };
}

module.exports = getPaginatedData;
