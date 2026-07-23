package com.knowledgegap.knowledge_gap_platform.dto.assessment;

import com.knowledgegap.knowledge_gap_platform.entity.enums.AnswerOption;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GeneratedQuestion {
    private String question;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private AnswerOption correctAnswer;
    private String difficulty;
    private String explanation;
}
