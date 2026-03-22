import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { QuizAnswer } from './quiz-answer.entity';
import { QuestionType } from '../types/question-type';

@Entity('QuizQuestion')
export class QuizQuestion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    topic: string;

    @Column()
    subtopic: string;

    @Column()
    questionDescription: string;

    @OneToMany(() => QuizAnswer, (answer: QuizAnswer) => answer.question, { cascade: true })
    answers: QuizAnswer[];

    @Column({ type: 'enum', enum: QuestionType, default: QuestionType.MULTIPLE_CHOICE })
    type?: QuestionType;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
