import request from "./HTTP";

// export const CHECKLIST_INSTANCE_ENDPOINT = `${appData.apiGatewayUrl}${CHECKLIST_INSTANCE}`;
// export const CHECKLIST_ITEM_INSTANCE_ENDPOINT = `${appData.apiGatewayUrl}${CHECKLIST_ITEM_INSTANCE}`;

// export const getChecklistInstances = async () => {
//   const r = await request.get(CHECKLIST_INSTANCE_ENDPOINT);
//   if (r.success) {
//     const data = r.data;
//     return { success: true, message: r.message, data: data };
//   }
//   return { success: false, message: r.message };
// };

export const getChecklistItemInstanceById = async (url, id) => {
  const r = await request.get(
    `${url}?checklist-instance-id=${id}`,
  );
  if (r.success) {
    const data = r.data;
    return { success: true, message: r.message, data: data };
  }
  return { success: false, message: r.message };
};

export const completeChecklistItemInstances = async (url, data) => {
  const r = await request.put(
    `${url}/complete`,
    data
  );
  if (r.success) {
    return { success: true, message: r.message };
  }
  return { success: false, message: r.message };
};

// export const getAllRecords = async (
//   endpoint,
//   { rowsPerPage, page, sortBy, sortDirection, searchBy }
// ) => {
//   const pagination =
//     typeof rowsPerPage === "number" &&
//     rowsPerPage > 0 &&
//     typeof page === "number" &&
//     page >= 0
//       ? `?size=${rowsPerPage}&page=${page}`
//       : "";
//   const orderBy =
//     sortBy && ["createdOn", "createdBy"].includes(sortBy)
//       ? sortBy
//       : `${getSortByPrefix(endpoint)}.${sortBy}`;
//   const sort =
//     sortBy && sortDirection
//       ? `&sort-by=${orderBy}&sort-order=${sortDirection}`
//       : "";
//   const search = searchBy ? `&q=${searchBy}` : "";
//   const r = await request.get(
//     `${getEndpoint(endpoint)}${pagination}${sort}${search}`
//   );
//   // console.log('all r*********', r)
//   // console.log(`${getEndpoint(endpoint)}${pagination}${sort}${search}`)
//   if (r.success) {
//     const data = r.data;
//     // console.log('all data*********', data)
//     return { success: true, message: r.message, data: data };
//   }
//   return { success: false, message: r.message };
// };
