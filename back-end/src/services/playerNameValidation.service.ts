/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from "@nestjs/common";
@Injectable()
export class PlayerNameValidationService {
    async validatePlayerName(inputtedPlayerDisplayName: string) {
        if(inputtedPlayerDisplayName.length === 0){
            throw new BadRequestException("Please type a valid name!");
        }
        else if(inputtedPlayerDisplayName.length>16){
            throw new BadRequestException("Your name should not contain more than 16 characters");
        }
    }
}