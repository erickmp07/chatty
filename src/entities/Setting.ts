import { 
    Entity, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    PrimaryColumn 
} from "typeorm"

@Entity("settings")
class Setting {
    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    chat: boolean;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;
}

export { Setting };