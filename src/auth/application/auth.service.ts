import { usersRepository } from "../../users/repositories/users.repository";
import { bcryptService } from "../adapters/bcrypt.service";
import { jwtService } from "../adapters/jwt.service";
import { WithId } from "mongodb";
import { User } from "../../users/types/user";

export const authService = {
    async loginUser(
        loginOrEmail: string,
        password: string
    ): Promise<{ accessToken: string } | null> {
        const user = await this.checkUserCredentials(loginOrEmail, password);
        if (!user) {
            return null;
        }

        const accessToken = await jwtService.createToken(user._id.toString());
        return { accessToken: accessToken };
    },

    async checkUserCredentials(
        loginOrEmail: string,
        password: string
    ): Promise<WithId<User> | null> {
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail);
        if (!user) return null;

        const isPassCorrect = bcryptService.checkPassword(password, user.password);
        if (!isPassCorrect) return null;

        return user;
    },
};
