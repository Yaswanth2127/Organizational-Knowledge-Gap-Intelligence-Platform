import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, AlertTriangle } from "lucide-react";

import assessmentService from "../../services/assessmentService";
import questionService from "../../services/questionService";

import AssessmentProgress from "../../components/assessment/AssessmentProgress";
import QuestionCard from "../../components/assessment/QuestionCard";
import AssessmentNavigation from "../../components/assessment/AssessmentNavigation";
import SubmitAssessmentDialog from "../../components/assessment/SubmitAssessmentDialog";
import AssessmentResultModal from "../../components/assessment/AssessmentResultModal";

const TakeAssessment = () => {

    const { assessmentId } = useParams();
    const navigate = useNavigate();

    const [assessment, setAssessment] = useState(null);
    const [questions, setQuestions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    /*
        answers structure

        {
            questionId : "A",
            questionId : "D"
        }

    */

    const [answers, setAnswers] = useState({});

    const [submitDialogOpen, setSubmitDialogOpen] = useState(false);

    const [resultOpen, setResultOpen] = useState(false);

    const [result, setResult] = useState(null);

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadAssessment();
    }, []);

    const loadAssessment = async () => {

        try {

            setLoading(true);

            const [assessmentRes, questionRes] =
                await Promise.all([
                    assessmentService.getAssessmentById(assessmentId),
                    questionService.getQuestionsByAssessment(assessmentId)
                ]);

            setAssessment(assessmentRes.data);

            setQuestions(questionRes.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleAnswerSelect = (answer) => {

        const question = questions[currentQuestion];

        setAnswers(prev => ({
            ...prev,
            [question.id]: answer
        }));

    };

    const nextQuestion = () => {

        if (currentQuestion < questions.length - 1) {

            setCurrentQuestion(prev => prev + 1);

        }

    };

    const previousQuestion = () => {

        if (currentQuestion > 0) {

            setCurrentQuestion(prev => prev - 1);

        }

    };

    const answeredQuestions = useMemo(() => {

        return Object.keys(answers).length;

    }, [answers]);

    const submitAssessment = async () => {

        try {

            setSubmitting(true);

            const payload = {

                assessmentId: Number(assessmentId),

                answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({
                    questionId: Number(questionId),
                    selectedAnswer
                }))

            };

            const response =
                await assessmentService.submitAssessment(payload);

            setResult(response.data);

            setSubmitDialogOpen(false);

            setResultOpen(true);

        } catch (error) {

            console.error(error);

            alert(
                error?.response?.data?.message ??
                "Unable to submit assessment."
            );

        } finally {

            setSubmitting(false);

        }

    };if (loading) {
    return (
        <div className="flex justify-center items-center h-[70vh]">
            <Loader2
                size={45}
                className="animate-spin text-indigo-600"
            />
        </div>
    );
}

if (!assessment || questions.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh]">
            <AlertTriangle
                size={55}
                className="text-red-500 mb-4"
            />

            <h2 className="text-2xl font-bold">
                Assessment Not Found
            </h2>

            <p className="text-gray-500 mt-2">
                Unable to load assessment questions.
            </p>

            <button
                onClick={() => navigate("/assessment")}
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
            >
                Back
            </button>
        </div>
    );
}

return (
    <div className="space-y-6">

        {/* Page Header */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

            <h1 className="text-3xl font-bold text-gray-900">
                {assessment.skillName}
            </h1>

            <p className="text-gray-500 mt-2">
                Answer all questions carefully before submitting.
            </p>

        </div>

        {/* Progress */}

       <AssessmentProgress
    currentQuestion={currentQuestion}
    totalQuestions={questions.length}
    questions={questions}
    answers={answers}
    onQuestionSelect={setCurrentQuestion}
/>

        {/* Question */}

        <QuestionCard
            question={questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            selectedAnswer={
                answers[questions[currentQuestion].id]
            }
            onAnswerSelect={handleAnswerSelect}
        />

        {/* Navigation */}

        <AssessmentNavigation
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            answers={answers}
            questions={questions}
            onPrevious={previousQuestion}
            onNext={nextQuestion}
            onSubmit={() => setSubmitDialogOpen(true)}
            submitting={submitting}
        />

        {/* Submit Dialog */}

        <SubmitAssessmentDialog
            open={submitDialogOpen}
            answeredQuestions={answeredQuestions}
            totalQuestions={questions.length}
            submitting={submitting}
            onCancel={() => setSubmitDialogOpen(false)}
            onConfirm={submitAssessment}
        />

        {/* Result */}

        <AssessmentResultModal
            open={resultOpen}
            result={result}
            onClose={() => setResultOpen(false)}
        />

    </div>
);

};

export default TakeAssessment;