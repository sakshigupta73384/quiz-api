package com.quiz.api.controller;

import com.quiz.api.dto.Answer;
import com.quiz.api.entity.Question;
import com.quiz.api.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class QuestionController {

    @Autowired
    QuestionService service;

    // Add Question API

    @PostMapping("/add")
    public String addQuestion(@RequestBody Question question) {

        return service.addQuestion(question);
    }

    // Get All Questions API

    @GetMapping("/questions")
    public List<Question> getQuestions() {

        return service.getQuestions();
    }

    // Submit Quiz API

    @PostMapping("/submit")
    public int submitQuiz(@RequestBody List<Answer> answers) {

        return service.getScore(answers);
    }
}