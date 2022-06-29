import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "./AddExerciseStyles.css";
import {
    useGetExercisesQuery,
    useGetExercisesByPageQuery,
} from "../../../../../redux/features/api/exercisesApi";

const AddExerciseList = ({ showModal, setShowModal }) => {
    const [pageNum, setPageNum] = React.useState(1);
    const { data: allExercises } = useGetExercisesQuery();
    const {
        data: exercisesByPage,
        isLoading,
        isFetching,
        isSuccess,
    } = useGetExercisesByPageQuery(pageNum);
    const maxNumPages = Math.ceil(allExercises.length / 10);
    let exercisesDisplay;
    if (isLoading || isFetching) {
        exercisesDisplay = <p>Loading...</p>;
    } else if (isSuccess) {
        exercisesDisplay = exercisesByPage.map(exercise => (
            <li key={exercise._id} className="exercise-list-item">
                <p>{exercise.name}</p>
                <button>Add</button>
            </li>
        ));
    }

    return (
        <>
            <div
                className={`add-exercise-container ${
                    showModal ? "blurred" : ""
                }`}
            >
                <div className="add-exercise-content">
                    <h1 className="add-exercise-title">Exercises</h1>
                    <input
                        name="search-exercise"
                        placeholder="Search For Exercise"
                    />
                    <button
                        className="create-exercise-btn"
                        onClick={() => setShowModal(true)}
                    >
                        Create Exercise
                    </button>
                    <ul>{exercisesDisplay}</ul>
                </div>
                <div className="add-exercise-footer">
                    <button
                        className="page-btn-left"
                        onClick={() => setPageNum(prev => prev - 1)}
                        disabled={pageNum === 1 ? true : false}
                    >
                        <FontAwesomeIcon
                            className="change-page-icon"
                            icon={faArrowLeft}
                        />
                    </button>
                    <button
                        className="page-btn-right"
                        onClick={() => setPageNum(prev => prev + 1)}
                        disabled={maxNumPages === pageNum ? true : false}
                    >
                        <FontAwesomeIcon
                            className="change-page-icon"
                            icon={faArrowRight}
                        />
                    </button>
                </div>
            </div>
        </>
    );
};

export default AddExerciseList;
