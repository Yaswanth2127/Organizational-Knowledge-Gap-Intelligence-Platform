package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.assessment.QuestionResponse;
import com.knowledgegap.knowledge_gap_platform.entity.Question;
import com.knowledgegap.knowledge_gap_platform.exception.ResourceNotFoundException;
import com.knowledgegap.knowledge_gap_platform.repository.QuestionRepository;
import com.knowledgegap.knowledge_gap_platform.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    @Override
    public List<QuestionResponse> getQuestionsByAssessment(Long assessmentId) {
        List<Question> questions =
                questionRepository.findByAssessmentIdOrderByQuestionOrder(assessmentId);

        if (questions.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No questions found for assessment id: " + assessmentId);
        }

        return questions.stream()
                .map(this::mapToQuestionResponse)
                .toList();

    }

    @Override
    public QuestionResponse getQuestionById(Long questionId) {
        Question question=questionRepository.findById(questionId).orElseThrow(()->new ResourceNotFoundException("Question details are not found "));
        return mapToQuestionResponse(question);
    }
    private QuestionResponse mapToQuestionResponse(Question question){
        return QuestionResponse.builder()
                .questionOrder(question.getQuestionOrder())
                .id(question.getId())
                .optionA(question.getOptionA())
                .optionB(question.getOptionB())
                .optionC(question.getOptionC())
                .optionD(question.getOptionD())
                .question(question.getQuestion())
                .build();
    }
}
