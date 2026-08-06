package com.knowledgegap.knowledge_gap_platform.dto.assessment;

import com.knowledgegap.knowledge_gap_platform.entity.enums.AnswerOption;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionAnswerRequest {
    @NotNull
    private Long questionId;

    @NotNull
    private AnswerOption selectedAnswer;
}
