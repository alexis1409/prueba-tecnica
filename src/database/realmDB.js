import Realm from "realm";

export const BANKS = "banks"

const BancosSchema = {
    name: BANKS,
    properties: {
      id: 'int',
      bankName: 'string',
      description: 'string',
      age: 'int',
      url: 'string'
    },
    primaryKey: 'id',
  };

  export const databaseOptions = {
    path: 'test',
    schema: [BancosSchema],
    schemaVersion: 1
}

export const runMigration = () => {
    const realm = new Realm({
        schema: [BancosSchema],
      schemaVersion: 1,
      migration: (oldRealm, newRealm) => {},
    });
  
    realm.close();
  };


export const queryBanks = () => new Promise((resolve, reject) => {
    (async () => {

    await Realm.open(databaseOptions).then(realm =>{
        let allTodoList = realm.objects(BANKS);
            resolve(allTodoList);
    }).catch((error) => reject(error));

    })();
});


export const inserBank = (newData) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm =>{
        realm.write(() => {
            realm.create(BANKS, newData)
            resolve(newData)
        })
    }).catch((error) => reject(error));
})
