import { checkError } from '../../../utils/helper'
import * as actionTypes from '../../actionTypes'

const initialState = {
    postDeletedDataSuccessfulMessage: "",
    postDeletedDataSuccessfully: false,
    patchSuccessMessage: "",
    patchDataCreatedSuccessfully: false,
    createdProfileData : {},
}

export const commonProfileReducer = (state = initialState, action) => {
    const { errorData, isError } = checkError(state, action);
    if (isError) {
        return { ...errorData }
    }

    switch (action.type) {
        case actionTypes.POST_PROFILE_COMMON_DELETE:
            const initialDeleteData = action.payload.data
            return {
                ...state,
                postDeletedDataSuccessfulMessage: initialDeleteData ? (typeof initialDeleteData === "string" ? initialDeleteData : initialDeleteData.message || "Deleted Successfully") : initialDeleteData.message || "Deleted Successfully",
                postDeletedDataSuccessfully: true
            }
        case actionTypes.COMMON_ACTION_FOR_COMMON_PROFILE_REDUCER:
            return {
                ...state,
                ...action.payload
            }
        case actionTypes.PATCH_COMMON_CREATE_DATA:
            const patchDataInitial = action.payload.data
            return {
                ...state,
                patchDataCreatedSuccessfully: true,
                patchSuccessMessage: patchDataInitial ? patchDataInitial.message : ""
            }

        case actionTypes.POST_COMMON_PROFILE_CREATED_DATA: //to store the new profile that's created
            const initialData = action.payload.data;
            const data = initialData ? initialData : {};
            return {
                ...state,
                createdProfileData: data,
                newDataCreatedSuccessfully : true,
            }
    }
    return { ...state }
};