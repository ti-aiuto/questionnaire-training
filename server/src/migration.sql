CREATE TABLE IF NOT EXISTS `answers` (
    `answer_id` int NOT NULL AUTO_INCREMENT,
    `questionnaire_id` int NOT NULL,
    `question_answers` json DEFAULT NULL,
    `submitted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`answer_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `questionnaires` (
    `questionnaire_id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(256) DEFAULT NULL,
    `questions` json DEFAULT NULL,
    PRIMARY KEY (`questionnaire_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
