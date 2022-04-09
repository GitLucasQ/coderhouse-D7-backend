import { productExampleData, messagesExampleData } from './db/exampleData'

export class Contenedor {

    constructor(config, tableName) {
        this.config = config;
        this.tableName = tableName;
        this.knex = require('knex')(this.config);
        this.createTable();
    }

    async createTable() {        
        try {
            if (this.config.client === 'mysql') {
                if (!await this.knex.schema.hasTable(this.tableName)) {
                    // CREA LA TABLA EN LA BD
                    await this.knex.schema.createTable(this.tableName, (table) => {
                        table.increments('id')
                        table.string('title')
                        table.decimal('price')
                        table.string('thumbnail')
                    });

                    //INSERTA DATA DE EJEMPLO EN LA TABLA
                    await this.knex(this.tableName).insert(productExampleData);

                    console.log(`Tabla ${this.tableName} creada con éxito`);
                }
            }
            else {
                if (!await this.knex.schema.hasTable(this.tableName)) {
                    // CREA LA TABLA EN LA BD
                    await this.knex.schema.createTable(this.tableName, (table) => {
                        table.increments('id')
                        table.string('email')
                        table.datetime('date')
                        table.string('message')
                    });

                    //INSERTA DATA DE EJEMPLO EN LA TABLA
                    await this.knex(this.tableName).insert(messagesExampleData);

                    console.log(`Tabla ${this.tableName} creada con éxito`);
                }
            }            
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    async getAllProducts() {
        try {
            return await this.knex.from(this.tableName).select('title', 'price', 'thumbnail');
        }
        catch (error) {
            console.error('Error:', error);
            if (this.knex) this.knex.destroy();
        }
    }

    async addProduct(product) {
        try {
            await this.knex(this.tableName).insert(product);
        }
        catch (error) {
            console.error('Error:', error);
            if (this.knex) this.knex.destroy();
        }
    }

    async getAllMessages() {
        try {
            return await this.knex.from(this.tableName).select('email', 'date', 'message');
        }
        catch (error) {
            console.error('Error:', error);
            if (this.knex) this.knex.destroy();
        }
    }

    async addMessage(message) {
        try {
            await this.knex(this.tableName).insert(message);
        }
        catch (error) {
            console.error('Error:', error);
            if (this.knex) this.knex.destroy();
        }
    }
}