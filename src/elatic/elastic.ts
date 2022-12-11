import { Client } from '@elastic/elasticsearch';
import { DeleteByQueryRequest } from '@elastic/elasticsearch/lib/api/types';

export default class Elastic {
    private client;
    constructor() {
        //todo -> move all these secrets to config file and store in secrats digitial-ocean.
        this.client = new Client({
            cloud: {
                id: 'ConstructionSite:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGYzZWRhYzQ0ZTY4NjRiYzU4ODZjZjRmNGFkZWFkNWIwJDA2NGUwMDQ2ZmM1YjQ1ODhiMDQ5NmQxNGUwNzBmM2Y2',
            },
            auth: {
                username: 'elastic',
                password: 'w9FORv47oMKRY45InS4NaKy7'
            }
        });
    }
    async insertDocs(options: { index: string, document: object }) {
    console.log("InsideFunction");
    return this.client.index(options);
    };
    async search(options: { index: string, query: object }){
        return this.client.search(options);
    };
    async delete(query: DeleteByQueryRequest | DeleteByQueryRequest){
        return this.client.deleteByQuery(query);
    }
    async deleteIndex(index: string = 'items_v1') {
        return this.client.indices.delete({index});
    }
};
