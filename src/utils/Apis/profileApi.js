import axios from "axios";
import {axiosConfig} from '../helper'


axios.defaults.proxy = true;


//-----------------------------------------------------------------------------------------------------------------
//------------------------------PROFILES---------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------



export const getCommonProfilesLandingViewTableDataApi = (type, subType, perPageRows, currentPage, searchData, headingData, sortingType) => { //to get a type of profile data based on the type and subtype
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/${type}/${subType}/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || "_id"}&sortOrder=${sortingType || "dsc"}&filterKey=${searchData ? "name" : ""}&filterQuery=${searchData || ""}`, axiosConfig);
};


// export const getCommonProfilesLandingViewTableDataApi = (type, subType, perPageRows, currentPage, searchData, headingData, sortingType) => { //to get a type of profile data based on the type and subtype
//     const startNumber = ((currentPage - 1) * perPageRows) + 1
//     return axios.get(`/${type}/${subType}/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "name" : ""}&filterQuery=${searchData || ""}`, axiosConfig); 
// }

export const postHolidayCreatedDataApi = (data) => { //to post a type to profile that's newly created
    return axios.post(`/holiday/holiday-profiles/`, data, axiosConfig)
};

//-----------------------------------------------------------------------------------------------------------------
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX------END PROFILES------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//-----------------------------------------------------------------------------------------------------------------