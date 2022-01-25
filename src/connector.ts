import {
  ConnectorInterface,
  DatabaseRow,
  ConfigDatabaseInterface,
} from "sdz-agent-types";

import Firebird from "node-firebird";
import { resolve } from "path/posix";

export default class Connector implements ConnectorInterface {
  private connection: any;
  private config: any;

  constructor(config: ConfigDatabaseInterface) {
    this.setConfig(config);
  }

  async connect(): Promise<any> {
    if (!this.connection) {
      try {
        this.connection =  await new Promise(resolve => {
          Firebird.attach(this.config, function(err, db) {
            if(err) { 
              throw err;
            }
            resolve(db);
            return db;
          });
        })
      } catch (e) {
        console.log(e);
      }
    }
  }

  async close(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.detach();
      } catch (e) {
        console.log(e);
      }
    }
  }

  async execute(query: string): Promise<DatabaseRow[]> {
    let resultSet: DatabaseRow[] = [];
    if (!this.connection) {
      await this.connect();
    }
    try {
      const response = await new Promise(resolve => {
        this.connection.query(query, function(err, result) {
          if (err) {
            throw err;
          }
          resolve(result);
        });
      })
      if (response) {
        resultSet = response as DatabaseRow[];
      }
    } catch (e) {
      console.log(e);
    }
    return resultSet;
  }

  private setConfig(config: any): this {
    const options:any = {};
    options.lowercase_keys = false; // set to true to lowercase keys
    options.role = null;            // default
    options.pageSize = 4096;        // default when creating database
    options.pageSize = 4096;        // default when creating database
    options.retryConnectionInterval = 1000; // reconnect interval in case of connection drop
    this.config = {...options,
                   ...config};
    return this;
  }
}
