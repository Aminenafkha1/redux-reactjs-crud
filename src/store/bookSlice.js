import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



export const getBooks = createAsyncThunk('book/getBooks', async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await fetch('http://localhost:3005/books')
        const data = await res.json();
        return data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
})


export const insertBook = createAsyncThunk('book/insertBook', async (bookData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI

    bookData.username = getState().auth.name;
    try {
        const res = await fetch('http://localhost:3005/books', {
            method: 'POST',
            body: JSON.stringify(bookData),
            headers: {
                'Content-type': 'application/json ; charset=UTF-8'
            },
        })
        const data = await res.json();
        return data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
})



export const deleteBook = createAsyncThunk('book/deleteBook', async (id, thunkAPI) => {

    const { rejectWithValue } = thunkAPI
    try {
        const res = await fetch(`http://localhost:3005/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json ; charset=UTF-8'
            },
        })

        return id;

    } catch (error) {
        return rejectWithValue(error.message);
    }
})


export const getBook = createAsyncThunk('book/getBook', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await fetch(`http://localhost:3005/books/${item.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json ; charset=UTF-8'
            },
        })

        return item;

    } catch (error) {
        return rejectWithValue(error.message);
    }
})
const bookSlice = createSlice({
    name: 'book',
    initialState: { books: [], isLoading: false, error: null, bookInfo: null },
    reducers: {},
    extraReducers: {

        //get Books
        [getBooks.pending]: (state, action) => {
            state.isLoading = true
            state.error = null

        },
        [getBooks.fulfilled]: (state, action) => {
            state.isLoading = false
            state.books = action.payload

            console.log(action)

        },
        [getBooks.rejected]: (state, action) => {
            state.isLoading = false

            state.error = action.payload

        },

        //insert Book 

        [insertBook.pending]: (state, action) => {
            state.isLoading = true
            state.error = null

        },
        [insertBook.fulfilled]: (state, action) => {
            state.isLoading = false
            state.books.push(action.payload);

            console.log(action)

        },
        [insertBook.rejected]: (state, action) => {
            state.isLoading = false

            state.error = action.payload

        },


        //delete Book 

        [deleteBook.pending]: (state, action) => {
            state.isLoading = true
            state.error = null

        },
        [deleteBook.fulfilled]: (state, action) => {
            state.isLoading = false
            state.books = state.books.filter((item) => item.id !== action.payload)

            console.log(action)

        },
        [deleteBook.rejected]: (state, action) => {
            state.isLoading = false

            state.error = action.payload

        },



        //get Book 

        [getBook.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;

        },
        [getBook.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.bookInfo = action.payload;

            console.log(action)

        },
        [getBook.rejected]: (state, action) => {
            state.isLoading = false;

            state.error = action.payload;

        },


    }

})


export default bookSlice.reducer