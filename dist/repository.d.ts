import { AbstractRepository } from "sdz-agent-types";
export default class SQLRepository extends AbstractRepository {
    execute(query: string, page?: number, limit?: number): Promise<any>;
}
