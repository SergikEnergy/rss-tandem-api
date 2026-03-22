import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { QuizQuestion } from './quiz-question.entity';

@Entity('QuizAnswer')
export class QuizAnswer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    answerText: string;

    @Column({ default: false })
    isCorrect: boolean;

    @ManyToOne(() => QuizQuestion, (question) => question.answers, { onDelete: 'CASCADE' })
    question: QuizQuestion;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
