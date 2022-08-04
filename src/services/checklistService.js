import request from "./HTTP";
import {
  CHECKLIST_INSTANCE,
  CHECKLIST_ITEM_INSTANCE,
} from "../constants/endpoints";

export const CHECKLIST_INSTANCE_ENDPOINT = `${process.env.REACT_APP_API_GATEWAY_URL}${CHECKLIST_INSTANCE}`;
export const CHECKLIST_ITEM_INSTANCE_ENDPOINT = `${process.env.REACT_APP_API_GATEWAY_URL}${CHECKLIST_ITEM_INSTANCE}`;

export const getChecklistInstances = async () => {
  const r = await request.get(CHECKLIST_INSTANCE_ENDPOINT);
  if (r.success) {
    const data = r.data;
    return { success: true, message: r.message, data: data };
  }
  return { success: false, message: r.message };
};

export const getChecklistItemInstanceById = async (id) => {
  const r = await request.get(
    `${CHECKLIST_ITEM_INSTANCE_ENDPOINT}?checklist-instance-id=${id}`
  );
  if (r.success) {
    const data = r.data;
    return { success: true, message: r.message, data: data };
  }
  return { success: false, message: r.message };
};

export const completeChecklistItemInstances = async (data) => {
  const r = await request.put(
    `${CHECKLIST_ITEM_INSTANCE_ENDPOINT}/complete`,
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
