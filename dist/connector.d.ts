import { ConnectorInterface, DatabaseRow, ConfigDatabaseInterface } from "sdz-agent-types";
export default class Connector implements ConnectorInterface {
    private connection;
    private config;
    constructor(config: ConfigDatabaseInterface);
    connect(): Promise<any>;
    close(): Promise<void>;
    execute(query: string): Promise<DatabaseRow[]>;
    private setConfig;
}
