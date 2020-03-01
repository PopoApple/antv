export const loadList = ({ album, key, page }) => {
    console.log('album, key, page--------', album, key, page)
    return new Promise((res, rej) => {
        setTimeout(() => {
            let data = []
            for (let i = 0; i < 10; i++) {
                data.push({
                    no: String(i + 1),
                    hidden: i < 2 ? true : false,
                    name: '高三英语冲冲冲234567',
                    desc: '高三英语冲冲冲234567',
                    cover: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
                    time: '2017-10-31',
                    tags: i < 1 ? ['专辑标签', '专辑标签', '专辑标签', '专辑标签', '专辑标签'] : ['专辑标签', '专辑标签', '专辑标签', '专辑标签'],
                })
            }
            res({ data, total: 30 })
        }, 200)
    })
}

export const loadAlbumDict = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            let data = [{ val: 'album1', text: '新东方系列课程' }, { val: 'album2', text: '新西方系列课程' }]
            res(data)
        }, 200)
    })
}

export const hide = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, 200)
    })
}

export const cancelHide = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, 200)
    })
}

export const save = (data) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, 200)
    })
}

export const deleteRecord = (no) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, 200)
    })
}

