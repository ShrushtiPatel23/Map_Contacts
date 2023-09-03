export const contactReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CONTACT":
            return { ...state, allData: [...state.allData, { ...action.payload}] }
        case "REMOVE_CONTACT":
            return { ...state, allData: state.allData.filter((c) => c !== action.payload) }
        case "EDIT_CONTACT":
            return { ...state, allData: state.allData.map((item,i) =>  i === action.payload.id ? action.payload.data : item) }
        default:
            return state;
    }
}

