import { createSlice } from "@reduxjs/toolkit";

let musicSlice = createSlice({
    name: 'musicSlice',
    initialState:{
        musics: []
    },
    reducers: {

    }
})


export const musicActions = musicSlice.actions;
export default musicSlice.reducer;