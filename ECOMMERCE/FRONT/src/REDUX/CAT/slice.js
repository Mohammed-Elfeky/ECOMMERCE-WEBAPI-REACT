import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { addCat, uploadImage } from './api'

const initialState = {
    err: null,
    cat:null
};


export const addCategory = createAsyncThunk(
    'cat/add',
    async ({name,desc:Description,img},thunkAPI) => {
        try {
            
            //submit data
            let {data}=await addCat({name,Description})

            //upload image
            await uploadImage(data.id,"cat",img)
            
            return data;
        } catch ({response:{data}}) {
            return thunkAPI.rejectWithValue(data)
        }
    }
);

export const catSlice = createSlice({
    name: 'cat',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addCategory.fulfilled, (state,{payload}) => {
                state.err=null;
                state.cat=payload
            })
            .addCase(addCategory.rejected, (state,{payload}) => {
                state.err=payload;
                state.cat=null;
            })
    },
});

export default catSlice.reducer;