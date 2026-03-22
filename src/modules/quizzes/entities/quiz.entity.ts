import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { QuizQuestion } from './quiz-question.entity';
import { QuestionType } from '../types/question-type';

// TODO when if need to get quiz for front - add this endpoints
@Entity('Quiz')
export class Quiz {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: QuestionType, default: QuestionType.MULTIPLE_CHOICE })
    quizType: QuestionType;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @OneToMany(() => QuizQuestion, (question) => question.quiz, { cascade: true })
    questions: QuizQuestion[];

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
