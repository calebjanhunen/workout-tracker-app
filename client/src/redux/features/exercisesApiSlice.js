import { apiSlice } from "redux/api/apiSlice";

export const exercisesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createExercise: builder.mutation({
            query: exercise => ({
                url: "/exercises",
                method: "POST",
                body: exercise,
            }),
        }),
        getExercises: builder.query({
            query: () => "/exercises",
        }),
        getExercisesByQuery: builder.query({
            query: ({ pageNum, resultsPerPage, bodyPartFilter }) =>
                `/exercises?limit=${resultsPerPage}&page=${pageNum}&filter=${bodyPartFilter}`,
        }),
        deleteExercise: builder.mutation({
            query: id => ({
                url: `/exercises/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["Exercises"],
        }),
    }),
});

export const {
    useCreateExerciseMutation,
    useGetExercisesQuery,
    useLazyGetExercisesByQueryQuery,
    useDeleteExerciseMutation,
} = exercisesApiSlice;
