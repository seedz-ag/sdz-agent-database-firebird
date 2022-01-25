"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_firebird_1 = __importDefault(require("node-firebird"));
class Connector {
    constructor(config) {
        this.setConfig(config);
    }
    async connect() {
        if (!this.connection) {
            try {
                this.connection = await new Promise(resolve => {
                    node_firebird_1.default.attach(this.config, function (err, db) {
                        if (err) {
                            throw err;
                        }
                        resolve(db);
                        return db;
                    });
                });
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    async close() {
        if (this.connection) {
            try {
                await this.connection.detach();
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    async execute(query) {
        let resultSet = [];
        if (!this.connection) {
            await this.connect();
        }
        try {
            const response = await new Promise(resolve => {
                this.connection.query(query, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    resolve(result);
                });
            });
            if (response) {
                resultSet = response;
            }
        }
        catch (e) {
            console.log(e);
        }
        return resultSet;
    }
    setConfig(config) {
        const options = {};
        options.lowercase_keys = false; // set to true to lowercase keys
        options.role = null; // default
        options.pageSize = 4096; // default when creating database
        options.pageSize = 4096; // default when creating database
        options.retryConnectionInterval = 1000; // reconnect interval in case of connection drop
        this.config = { ...options,
            ...config };
        return this;
    }
}
exports.default = Connector;
