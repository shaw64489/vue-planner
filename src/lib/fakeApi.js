
const data = {
    activities: {
        "1546968934": {
            id: "1546968934",
            title: "Learn Vue.js",
            notes: "I started today and it was not good.",
            progress: 50,
            category: "1546969049",
            createdAt: 1546969144391,
            updatedAt: 1546969144391
        },
        "1546969212": {
            id: "1546969212",
            title: "Read Witcher Books",
            notes: "These books are super nice",
            progress: 60,
            category: "1546969049",
            createdAt: 1546969144391,
            updatedAt: 1546969144391
        }
    },
    categories: {
        "1546969049": { text: "books", id: "1546969049" },
        "1546969225": { text: "movies", id: "1546969225" }
    }
}

class FakeApi {

    //initial fill of sotrage
    fillDB() {
        this.commitData(data);
    }

    //store data to local storage
    commitData(data) {
        localStorage.setItem('activity_data', JSON.stringify(data));
    }

    //get data from local storage
    getData() {
        const activityData = localStorage.getItem('activity_data');
        return JSON.parse(activityData);
    }

    canContinue() {
        const rndNumber = Math.floor(Math.random() * 10);

        if (rndNumber > 5) {
            return true;
        }

        return false;
    }

    get(resource, { force = 0 }) {

        return new Promise((resolve, reject) => {
            //simulate async behavior
            this.asyncCall(() => {
                if (force || this.canContinue()) {
                    const data = this.getData();
                    resolve({ ...data[resource] });
                } else {
                    reject('Cannot fetch' + resource)
                }
            })
        })
    }

    post(resource, item) {
        return new Promise((resolve, reject) => {
            const data = this.getData();
            data[resource][item.id] = item;
            this.commitData(data);
            resolve(item)
        });
    }

    delete(resource, item) {
        return new Promise((resolve, reject) => {
            const data = this.getData();
            delete data[resource][item.id]
            this.commitData(data);
            resolve(item)
        })
    }


    asyncCall(cb) {
        setTimeout(cb, 1000)
    }

}

export default new FakeApi();