import { AbstractRepository } from "sdz-agent-types";

export default class SQLRepository extends AbstractRepository {
    execute(query: string, page?: number, limit?: number): Promise<any> {

    const newQuery = "undefined" !== typeof page && limit ?  this.buildQuery(query).replace(/^SELECT/gi, `SELECT FIRST  ${limit}  SKIP  ${page*limit}`) : this.buildQuery(query);
    return this.getConnector().execute(newQuery);
  }
}