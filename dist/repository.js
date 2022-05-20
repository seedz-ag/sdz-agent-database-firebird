"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdz_agent_types_1 = require("sdz-agent-types");
class SQLRepository extends sdz_agent_types_1.AbstractRepository {
    execute(query, page, limit) {
        const statement = [
            "SELECT",
            limit && `FIRST ${limit}`,
            limit && page && `SKIP ${limit * page}`,
            this.buildQuery(query).replace(/^SELECT/gi, '')
        ].filter(v => !!v).join(' ');
        return this.getConnector().execute(statement);
    }
    async count(entity) {
        const resultSet = await this.execute(`SELECT COUNT (*) as total FROM (${this.buildQuery(entity)}) as total`);
        const obj = {};
        Object.keys(resultSet).map((key) => obj[key.toLowerCase()] = resultSet[key]);
        return obj[0].TOTAL;
    }
}
exports.default = SQLRepository;
