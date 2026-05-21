package com.quiz.api.service;

import com.quiz.api.dto.Answer;
import com.quiz.api.entity.Question;
import com.quiz.api.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    QuestionRepository repo;

    // Add Question

    public String addQuestion(Question question) {

        repo.save(question);

        return "Question Added";
    }

    // Get All Questions

    public List<Question> getQuestions() {

        return repo.findAll();
    }

    // Submit Quiz

    public int getScore(List<Answer> answers) {

        int score = 0;

        for (Answer ans : answers) {

            Question q = repo.findById(ans.getId()).orElse(null);

            if (q != null && q.getAnswer().equalsIgnoreCase(ans.getResponse())) {

                score++;
            }
        }

        return score;
    }
}