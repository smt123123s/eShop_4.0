const _apiRequest = (url, method, data) => {
    return new Promise((resolve, reject) => {
        my.request({
            url: url,
            method: method,
            data: data,
            success: (res) => {
                if(res.data.success == 1) {
                    resolve(res.data);
                } else {
                    reject({
                        ...res.data,
                        error_type: "API_RESPONSE_ERROR"                    
                    });
                };
            },
            fail: (err) => {
                reject({
                    success: 0,
                    error_code: err.status || err.error || 0,
                    error_type: "API_RESPONSE_ERROR"
                });
            }
        });
    });
};

/**
 * API LIST
 */
