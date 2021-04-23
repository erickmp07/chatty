import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    async create(email: string) {
        const userExists = await this.userRepository.findOne({
            email
        });

        if (userExists) {
            return userExists;
        }

        const user = this.userRepository.create({
            email
        });

        await this.userRepository.save(user);

        return user;
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({ email });

        return user;
    }
}

export { UserService };