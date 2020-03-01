export const loadList = ({ album, key, page }) => {
    console.log('album, key, page--------', album, key, page)
    return new Promise((res, rej) => {
        setTimeout(() => {
            let data = []
            for (let i = 0; i < 10; i++) {
                data.push({
                    no: String(i + 1),
                    name: `${album}_${key}_page${page} 内容名称 ${i + 1}`,
                    desc: '专辑内容的简介是100个，你这里可以酌情显示一部分，剩余的为省略号',
                    time: '2020-10-10',
                    hidden: i < 2 ? true : false,
                })
            }
            res({ data, total: 30 })
        }, 1000)
    })
}

export const loadAlbumDict = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            let data = [{ val: 'album1', text: '新东方系列课程' }, { val: 'album2', text: '新西方系列课程' }]
            res(data)
        }, 1000)
    })
}

export const hide = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, 1000)
    })
}

export const cancelHide = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, 1000)
    })
}

export const save = (data) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, 1000)
    })
}

export const deleteRecord = (no) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, 200)
    })
}
