//引入action类型常量名
import {
    UPDATE_LIST_CONFIGS,
    CHANGE_LIST_CHECKBOX,
    GET_COMMENT_LIST,
    GET_COMMENT_INFO,
    POST_COMMENT_INFO,
    DELETE_COMMENT,
    UPDATE_COMMENT_STATE
} from '../constants'


//初始化状态
const commentInitialState = {
    isFetching: 0,
    error: 0,
    message: '',
    tools: [
        {
            text: '删除',
            icon: 'icon-close'
        },{
            text: '批量审核',
            icon: 'icon-note'
        }
    ],
    list: [], //列表数据
    info: null, //单条管理员信息(用于查看和编辑)
    count: 0, //列表总条数
    //列表配置
    configs:{
        listPath: 'comment',
        page: 1, //当前页
        limit: 20, //单页显示条数
        searchMode: 0, //搜索模式
        checkboxs: true, //选择框 0->无, 1->有
        checked: false, //false->无, all->全选, []->单多选
        search: '',
        order: [],
        column: [{
            key: 'name',
            title: '评论者',
            order: true,
            visibility: true,
            width: 120,
            resize: 1
        },{
            key: 'email',
            title: '邮箱',
            order: true,
            visibility: true,
            width: 200,
            resize: 1
        },{
            key: 'url',
            title: '网址',
            order: true,
            visibility: true,
            width: 180,
            resize: 1
        },{
            key: 'state',
            title: '状态',
            order: true,
            visibility: true,
            width: 80,
            resize: 1
        },{
            key: 'created_at',
            title: '时间',
            order: true,
            visibility: true,
            width: 200,
            resize: 1
        },{
            key: 'ip',
            title: 'IP',
            order: true,
            visibility: true,
            width: 200,
            resize: 1
        }]
    }
}

export function comment(state = commentInitialState, action) {

    if (action.path !== "comment") {
        return state
    }

    let ids = [], oldlist = []

    //根据不同的action type进行state的更新
    switch (action.type) {
        case GET_COMMENT_LIST:
            action.payload.configs = {
                ...state.configs,
                ...action.payload.configs
            }
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_LIST_CONFIGS:
            let configs = {...state.configs, ...action.payload}
            return {...state, ...{configs}}
        case CHANGE_LIST_CHECKBOX:
            let list = [...action.payload]
            return {...state, list:[...list]}
        case GET_COMMENT_INFO:
            return {...state, info: action.payload.info}
        case POST_COMMENT_INFO:
            return {...state, ...action.payload}
        case DELETE_COMMENT:
            ids = action.payload.ids
            oldlist = state.list
            if (ids) {
                for (let i = 0; i < ids.length; i++) {
                    for (let k = 0; k < oldlist.length; k++) {
                        if (ids[i] == oldlist[k].id) {
                            oldlist.splice(k, 1)
                        }
                    }
                }
            }
            return {...state, ...action.payload, list: [...oldlist]}
        case UPDATE_COMMENT_STATE:
            ids = action.payload.ids
            oldlist = state.list
            if (ids) {
                for (let i = 0; i < ids.length; i++) {
                    for (let k = 0; k < oldlist.length; k++) {
                        if (ids[i] == oldlist[k].id) {
                            oldlist[k].state = action.payload.state
                        }
                    }
                }
            }
            return {...state, ...action.payload, list: [...oldlist]}
        default:
            return {...state}
    }
}
