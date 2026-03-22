import { Exclude } from 'class-transformer';
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

    @Column({ unique: true })
    questionDescription: string;

    @OneToMany(() => QuizAnswer, (answer: QuizAnswer) => answer.question, { cascade: true })
    answers: QuizAnswer[];

    @Column({ type: 'enum', enum: QuestionType, default: QuestionType.SINGLE_CHOICE })
    type?: QuestionType;

    @Exclude({ toClassOnly: true })
    @CreateDateColumn()
    createdAt?: Date;

    @Exclude({ toClassOnly: true })
    @UpdateDateColumn()
    updatedAt?: Date;
}
