import { AbstractRepository } from "sdz-agent-types";

export default class SQLRepository extends AbstractRepository {
    execute(query: string, page?: number, limit?: number): Promise<any> {

      const statement = [
        "SELECT",
        limit && `FIRST ${limit}`,
        limit && page && `SKIP ${limit * page}`,
        this.buildQuery(query).replace(/^SELECT/gi, '')
        ].filter(v => !!v).join(' ')

      return this.getConnector().execute(statement);
  }
}