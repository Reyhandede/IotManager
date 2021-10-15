/**
 * Convert json to href\n
 *	Example
 * 	url: user
 *  parameters: 
 * 	user?name=
 * @param url
 * @param params
 */
function $FD(params) {
    const formData = new FormData();
    if (params != null && typeof params == "object")
        Object.keys(params).forEach(key => formData.append(key, params[key]));
    return formData;
}


const Ajax = {
    Post: function (url, data = {}) {
        return new Promise((resolve, error) => {
            fetch(url, { method: "POST", body: $FD(data) }).then(e => resolve(e.text())).catch(error);
        });
    },
    Get: function (url, data = {}) {
        return new Promise((resolve, error) => {
            fetch($H(url, data), { method: "GET" }).then(e => resolve(e.text())).catch(error);
        });
    },
    Json: function (url, data = {}, method = "POST") {
        return new Promise((resolve, error) => {
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: method,
                body: JSON.stringify(data)
            }).then(e => resolve(e.json())).catch(error);
        });
    }
};




App.connection = {};
TriggerSystem(App.connection);

