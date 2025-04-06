import { JobListFetchType } from "../CustomTypes";
import { 
  INIT_FETCH_JOB_LIST,
  INIT_FETCH_JOB_STATUSES,
  INIT_FETCH_BOOKMARKED_STATUSES,
  INIT_DELETE_BOOKMARKED_STATUSES,
  INIT_SAVE_BOOKMARKED_STATUSES,
  INIT_FETCH_ANNOUNCEMENTS,
} from "./ActionTypes";

export const fetchCaseList = (data: JobListFetchType) => {
  let url = `/case-data/cases?size=${data.size}&page=${data.page}&order=${data.order}&orderBy=${data.orderBy}`;

  if (data.id) {
    url = `${url}&caseId=${data.id}`
  }

  if (data.customer) {
    url = `${url}&lastName=${data.customer}`
  }

  if (data.product) {
    url = `${url}&productName=${data.product}`
  }
  
  if (data.brand) {
    url = `${url}&productBrand=${data.brand}`
  }

  if (data.store) {
    url = `${url}&storeName=${data.store}`
  }

  if (data.fromDate) {
    url = `${url}&fromDate=${data.fromDate}`
  }

  if (data.status && data.status.length) {
    const statusString = data.status.join(',')
    url = `${url}&statusCode=${statusString}`
  }

  return {
    type: INIT_FETCH_JOB_LIST,
    url,
    data,
  };
};

export const fetchCaseStatuses = () => {
  const url = `/case-data/status-list`;

  return {
    type: INIT_FETCH_JOB_STATUSES,
    url,
  };
};

export const fetchBookmarkedStatuses = () => {
  const url = `/case-data/bookmarked-statuses`;

  return {
    type: INIT_FETCH_BOOKMARKED_STATUSES,
    url,
  };
};

export const deleteBookmarkedStatusById = (id: number) => {
  const url = `/case-data/bookmarked-statuses/${id}`;

  return {
    type: INIT_DELETE_BOOKMARKED_STATUSES,
    url,
    id,
  };
};

export const saveBookmarkedStatusList = (newList: number[]) => {
  const url = `/case-data/bookmarked-statuses`;

  return {
    type: INIT_SAVE_BOOKMARKED_STATUSES,
    url,
    data: newList,
  };
};

export const initFetchAnnouncements = () => {
  const url = `/case-data/announcements`;

  return {
    type: INIT_FETCH_ANNOUNCEMENTS,
    url,
  };
}
