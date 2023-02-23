const setGlobalData = (data, key, value, log=false) => {
    let isNew = true;
    if (data.hasOwnProperty(key)) {
        isNew = false;
    }
    data[key] = value;
    if(log) {
        console.log(
            "Global data",
            isNew ? "add new" : "updated",
            "- key:",
            key,
            ", value:",
            value
        );
    };
};

const removeGlobalData = (data, key) => {
    delete data[key];
    console.log("Global data removed - key:", key);
};

const getExistingStorageValueByKey = (key) => {
    let res = my.getStorageSync({
        key: key,
    });
    return res.data;
};

const preventDoubleClick = (func, timeout = 250) => {
    let last = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now > last + timeout) {
            last = now;
            return func.apply(this, args);
        }
    };
};

const preventDoublePromise = (func, timeout = 250) => {
    let _promise = null;
    return function (...args) {
        if (_promise === null) {
            _promise = func.apply(this, args);
            _promise
                .then(() => {
                    if (timeout >= 0) {
                        setTimeout(() => _promise = null, timeout)
                    }
                })
                .catch(() => {
                    _promise = null
                }
                );
        }
        return _promise;
    };
};

module.exports = {
    setGlobalData,
    removeGlobalData,
    getExistingStorageValueByKey,
    preventDoubleClick,
    preventDoublePromise
}