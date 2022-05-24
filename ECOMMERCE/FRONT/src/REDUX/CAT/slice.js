import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCat, getCatWithId, updateCat, uploadImage } from './api'

const initialState = {
    err: null,
    cat: null,
    cats:null
};


export const addCategory = createAsyncThunk(
    'cat/add',
    async ({ name, desc: Description, img }, thunkAPI) => {
        try {

            //submit data
            let { data } = await addCat({ name, Description })

            //upload image
            await uploadImage(data.id, "cat", img)

            return data;
        } catch ({ response: { data } }) {
            return thunkAPI.rejectWithValue(data)
        }
    }
);


export const getCatById = createAsyncThunk(
    'cat/get',
    async (id) => {
        let { data } = await getCatWithId(id)
        return data;
    }
);

export const getAllCats = createAsyncThunk(
    'cat/getAll',
    async () => {
        let { data } = await getAllCats()
        return data;
    }
);

export const editCat = createAsyncThunk(
    'cat/edit',
    async ({id,catObj}) => {
        await updateCat(id,catObj)
    }
);



export const catSlice = createSlice({
    name: 'cat',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addCategory.fulfilled, (state) => {
                state.err = null;
            })
            .addCase(addCategory.rejected, (state, { payload }) => {
                state.err = payload;
            })
            .addCase(getCatById.fulfilled, (state,{payload}) => {
                state.cat=payload;
            })
            .addCase(getCatById.rejected, (state, { payload }) => {
                console.log("redirect to error page")
            })
            .addCase(getAllCats.fulfilled, (state,{payload}) => {
                state.cats=payload;
            })
            .addCase(getAllCats.rejected, () => {
                console.log("redirect to error page")
            })
            .addCase(editCat.fulfilled, () => {
                console.log("redirect to index")
            })
            .addCase(editCat.rejected, () => {
                console.log("redirect to error page")
            })
    },
});

export default catSlice.reducer;