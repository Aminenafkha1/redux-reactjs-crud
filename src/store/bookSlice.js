import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



const getBooks = createAsyncThunk('book/getBooks', async (args,thunkAPI) => { })
const bookSlice = createSlice({
    name: 'book',
    initialState: { books: null },
    reducers: {}

})


export default bookSlice.reducer