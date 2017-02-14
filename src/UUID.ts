import * as uuid from 'uuid/v4';

export class UUID {

    private static nodes = {};

    public static register(node): string {

        let key: string = uuid();

        while (UUID.nodes[key]) {
            key = uuid();
        }

        UUID.nodes[key] = node;

        return key;
    }

    public static unregister(key) {
        delete UUID.nodes[key];
    }

}