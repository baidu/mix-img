export const mixConfig = {
    'dev': {
        'notUseCache': false
    },
    'replaceText': {
        'submitName': '朱雀号abc123',
        'userName': '百度网友abc123',
        'avatarUrl': 'https://efe-h2.cdn.bcebos.com/ceug/resource/res/2020-07/1594717976441/idyexeq1u92w.png',
        'qrCodeUrl': 'https://www.baidu.com'
    },
    'base': {
        'backgroundImg': 'https://efe-h2.cdn.bcebos.com/ceug/resource/res/2020-07/1594797097021/ml9v716tnxoc.jpg',
        'width': 375,
        'height': 667,
        'quality': 0.8,
        'fileType': 'jpeg',
        'loadingTimeout': 3000,
        'dataType': 'canvas'
    },
    'qrCode': {
        'width': 74,
        'height': 74,
        'text': '{qrCodeUrl}',
        'x': 279,
        'y': 576,
        'correctLevel': 1
    },
    'dynamic': [
        {
            'type': 2,
            'position': {
                'x': 187,
                'y': 353
            },
            'style': {
                'fontSize': 22,
                'color': '#ffebc0',
                'textAlign': 'center',
                'fontWeight': 'bold',
                'fontFamily': 'myFont'
            },
            'text': '『{submitName}』'
        },
        {
            'type': 2,
            'position': {
                'x': 187,
                'y': 254
            },
            'style': {
                'textAlign': 'center',
                'fontSize': 16,
                'color': '#ffebc0',
                'fontWeight': 'normal',
                'fontFamily': 'myFont2'
            },
            'text': '{userName}',
            'weight': 1
        },
        {
            'type': 1,
            'position': {
                'x': 169,
                'y': 207
            },
            'size': {
                'dWidth': 40,
                'dHeight': 40
            },
            'imgUrl': '{avatarUrl}',
            'isRound': true
        }
    ]
};

export const base64Config = Object.assign({}, JSON.parse(JSON.stringify(mixConfig)));
export const canvasConfig = Object.assign({}, JSON.parse(JSON.stringify(mixConfig)));
canvasConfig.base.dataType = 'canvas';
