const DB_NAME = 'sample_db';

if (!window.indexedDB) {
  console.warn('[WARN]', 'cannot use indexeddb');
} else {
  console.log('indexeddb can be use');
}

let db: IDBDatabase;
const dbReq = indexedDB.open('sample_db', 1);

dbReq.onerror = (error): void => {
  console.warn('ERROR! something is wrong..');
  console.log(error);
};

dbReq.onupgradeneeded = (event): void => {
  console.info('[INFO]', 'db onupgradeneeded!!');
  db = (event.target as IDBRequest).result;

  const store = db.createObjectStore(DB_NAME, {
    keyPath: 'imagePath',
  });
};

const imagePath = 'image004.jpg';

dbReq.onsuccess = (event): void => {
  console.info('[INFO]', 'db onsuccess');
  db = (event.target as IDBRequest).result;
};

const btn = document.querySelector('#loadbtn');
if (btn) {
  btn.addEventListener('click', (): void => {
    // load image from DB
    const trnx = db.transaction([DB_NAME], 'readwrite');

    trnx.objectStore(DB_NAME).get(imagePath).onsuccess = (event): void => {
      const imageBlob = (event.target as IDBRequest).result.blob as Blob;
      const fr = new FileReader();
      fr.onload = function(): void {
        const uri = this.result as string;

        const imgTag = document.createElement('img');
        imgTag.src = uri;
        document.body.appendChild(imgTag);
      };
      fr.readAsDataURL(imageBlob);
      // const imageUrl = URL.createObjectURL(image);
      // console.log(imageUrl);
    };
  });
}

// load image and insert
// const xhr = new XMLHttpRequest();
// xhr.open('GET', `./images/${imagePath}`, true);
// xhr.responseType = 'blob';

// xhr.addEventListener('load', (): void => {
//   if (xhr.status !== 200) {
//     return;
//   }
//   const blob = xhr.response;

//   // insert to DB
//   const trnx = db.transaction([DB_NAME], 'readwrite');
//   trnx.objectStore(DB_NAME).put({imagePath, blob});
// });

// xhr.send();
