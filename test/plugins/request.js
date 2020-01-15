import request from '../../dist';

const instance = request({
    baseURL: 'https://www.fastmock.site/mock/7f2e97ecf7a26f51479a4a08f6c49c8b',
    header: {
        contentType: 'application/x-www-form-urlencoded'
    }
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.error(error);
    }
);

instance.interceptors.response.use(
    (res, config) => {
        console.log('response result');
        console.log(res);
        console.log('=========================\n');

        return res.data.data;
    },
    (error) => {
        console.error(error);
    }
);

export default instance;
