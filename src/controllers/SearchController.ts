import { Request, Response } from "express";
import { SearchService } from "../services/SearchService";

export class SearchController {
    async search(request:Request, response:Response) {
        const searchService = new SearchService();

        const { txt } = request.body;

        try {
            if(txt) {
                const result = await searchService.search(txt);

                return response.status(200).json({users:result});
                
            } else {
                return response.status(401).json({ error: 'type something to search' });
            }
        } catch (error) {
            return response.status(400).json({ error:error.message });
        }
    }
}