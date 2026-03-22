import { Exclude } from 'class-transformer';
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

    @Exclude()
    @ManyToOne(() => QuizQuestion, (question) => question.answers, { onDelete: 'CASCADE' })
    question: QuizQuestion;

    @Exclude({ toClassOnly: true })
    @CreateDateColumn()
    createdAt?: Date;

    @Exclude({ toClassOnly: true })
    @UpdateDateColumn()
    updatedAt?: Date;
}
