import { apiSlice } from 'redux/api/apiSlice';

export const exercisesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createExercise: builder.mutation({
            query: exercise => ({
                url: '/exercises',
                method: 'POST',
                body: exercise,
            }),
            invalidatesTags: ['exercises'],
        }),
        getExercises: builder.query({
            query: () => '/exercises',
            providesTags: ['exercises'],
        }),
        getExercisesByQuery: builder.query({
            query: ({ bodyPart }) => `/exercises?bodyPart=${bodyPart}`,
            providesTags: ['exercises'],
        }),
        deleteExercise: builder.mutation({
            query: id => ({
                url: `/exercises/${id}`,
                method: 'DELETE',
                body: id,
            }),
            invalidatesTags: ['exercises'],
        }),
    }),
});

export const {
    useCreateExerciseMutation,
    useGetExercisesQuery,
    useLazyGetExercisesQuery,
    useLazyGetExercisesByQueryQuery,
    useGetExercisesByQueryQuery,
    useDeleteExerciseMutation,
} = exercisesApiSlice;
