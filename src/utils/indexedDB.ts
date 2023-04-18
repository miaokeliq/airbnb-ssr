export default class DB {
  private dbName: string; // 数据库名称
  private db: any; // 数据库对象
  constructor(dbName: string) {
    this.dbName = dbName;
  }

  // 打开数据库
  public openStore(storeName: string, keyPath: string, indexs?: Array<string>) {
    // 数据库名称，  数据库版本
    // 版本号只能增加不能减少，不然就数据库打开失败
    const request = window.indexedDB.open(this.dbName, 2);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log("数据库打开成功");
        this.db = event.target.result;
        resolve(true);
      };
      request.onerror = (event: any) => {
        console.log("数据库打开失败");
        console.log(event);
        reject(event);
      };
      request.onupgradeneeded = (event: any) => {
        console.log("数据库升级成功");
        const { result }: any = event.target;
        // 创建对象仓库
        const store = result.createObjectStore(storeName, {
          autoIncrement: true,
          keyPath: "id",
        });
        if (indexs && indexs.length > 0) {
          indexs?.map((v: string) => {
            // 新建索引 ，   索引名称，索引属性，配置对象
            store.createIndex(v, v, { unique: false });
          });
        }
        store.transaction.oncomplete = (event: any) => {
          console.log("创建对象仓库成功");
        };
      };
    });
  }

  // 新增数据库数据
  updateItem(storeName: string, data: any) {
    // 新建事务                      读写模式
    const store = this.db
      .transaction(storeName, "readwrite")
      .objectStore(storeName);
    // 接收对象
    const request = store.put({
      ...data,
      updateTime: new Date().getTime(),
    });
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log("数据写入成功");
        console.log(event);
        resolve(event);
      };
      request.onerror = (event: any) => {
        console.log("数据写入失败");
        console.log(event);
        reject(event);
      };
    });
  }

  deleteItem(storeName: string, key: number | string) {
    // 新建事务                      读写模式
    const store = this.db
      .transaction(storeName, "readwrite")
      .objectStore(storeName);
    // 接收对象
    const request = store.delete(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log("数据删除成功");
        console.log(event);
        resolve(event);
      };
      request.onerror = (event: any) => {
        console.log("数据删除失败");
        console.log(event);
        reject(event);
      };
    });
  }

  // 查询所有数据
  getList(storeName: string) {
    // 新建事务                      读写模式
    const store = this.db.transaction(storeName).objectStore(storeName);
    // 接收对象
    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log("查询所有数据成功");
        resolve(event.target.result);
      };
      request.onerror = (event: any) => {
        console.log("查询所有数据失败");
        console.log(event);
        reject(event);
      };
    });
  }

  // 查询某一条数据
  getItem(storeName: string, key: number | string) {
    // 新建事务                      读写模式
    const store = this.db.transaction(storeName).objectStore(storeName);
    // 接收对象
    const request = store.get(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log("查询某一条数据成功");
        console.log(event.target.result);
        resolve(event.target.result);
      };
      request.onerror = (event: any) => {
        console.log("查询某一条数据失败");
        console.log(event);
        reject(event);
      };
    });
  }
}
