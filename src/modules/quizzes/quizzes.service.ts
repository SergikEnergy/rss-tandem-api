import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { QuizQuestion } from './entities/quiz-question.entity';
import { QuizAnswer } from './entities/quiz-answer.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { FilterQuestionDto } from './dto/filter-question.dto';
import { isArrayWithItems } from '../../utils/is-array-with-items';
import { QuestionType } from './types/question-type';
import { DEFAULT_QUESTION_LIMIT } from '../../common/constants';

@Injectable()
export class QuizzesService {
    constructor(
        @InjectRepository(QuizQuestion)
        private questionsRepository: Repository<QuizQuestion>,
        @InjectRepository(QuizAnswer)
        private answersRepository: Repository<QuizAnswer>,
    ) {}

    async createQuestion(createQuestionDto: CreateQuestionDto): Promise<QuizQuestion> {
        const { answers, ...questionData } = createQuestionDto;

        const newQuestion = this.questionsRepository.create(questionData);
        const savedQuestion = await this.questionsRepository.save(newQuestion);

        if (isArrayWithItems(answers)) {
            const answersEntities = answers.map((answerDto) =>
                this.answersRepository.create({
                    ...answerDto,
                    question: savedQuestion,
                }),
            );

            savedQuestion.answers = await this.answersRepository.save(answersEntities);
        }

        delete savedQuestion.createdAt;
        delete savedQuestion.updatedAt;
        savedQuestion.answers.map((answer) => {
            const { createdAt, updatedAt, ...restAnswer } = answer;

            return restAnswer;
        });

        return savedQuestion;
    }

    async findAllQuestions(topic?: string, subtopic?: string, filterDto?: FilterQuestionDto): Promise<QuizQuestion[]> {
        if (!topic && !subtopic) {
            throw new BadRequestException(
                'Sorry, missed required property topic and subtopic, check your request data!',
            );
        }

        const where: FindOptionsWhere<QuizQuestion> = {
            topic,
            subtopic,
            type: filterDto?.questionType ?? QuestionType.SINGLE_CHOICE,
        };

        const questions = await this.questionsRepository.find({
            where,
            relations: ['answers'],
        });

        //get every time random quantity of questions
        questions.sort(() => Math.random() - 0.5);

        return questions.slice(0, filterDto?.limit ?? DEFAULT_QUESTION_LIMIT);
    }

    async findQuestion(id: string): Promise<QuizQuestion> {
        const question = await this.questionsRepository.findOne({
            where: { id },
            relations: ['answers'],
        });

        if (!question) {
            throw new NotFoundException(`Question with id ${id} not found`);
        }

        return question;
    }

    async updateQuestion(id: string, updateQuestionDto: UpdateQuestionDto): Promise<QuizQuestion> {
        const question = await this.findQuestion(id);
        const { answers, ...questionData } = updateQuestionDto;

        Object.assign(question, questionData);

        if (answers) {
            if (isArrayWithItems(question.answers)) {
                await this.answersRepository.delete({ question: { id } });
            }
            const answersEntities = answers.map((answerDto) =>
                this.answersRepository.create({
                    ...answerDto,
                    question,
                }),
            );
            question.answers = await this.answersRepository.save(answersEntities);
        }

        return await this.questionsRepository.save(question);
    }

    async removeQuestion(id: string): Promise<void> {
        const question = await this.findQuestion(id);

        await this.questionsRepository.remove(question);
    }
}
