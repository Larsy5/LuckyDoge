/**
 *
 * @param callback  回调
 * @param time  间隔时间
 * @param immediate  首次立即执行
 */
async function listenDogePoolBalanceChange(callback, time, immediate) {
    if (immediate) {
        callback(await currentFomoPool())
    }
    setInterval(async () => {
        callback(await currentFomoPool())
    }, time)
}

/**
 *
 * @param callback 回调
 * @param time 间隔时间
 * @param immediate 首次立即执行
 */
async function listenLottoPoolBalanceChange(callback, time, immediate) {
    if (immediate) {
        callback(await currentLottoPool())
    }
    setInterval(async () => {
        callback(await currentLottoPool())
    }, time)
}

/**
 * 获取最近的获奖者
 * @param limit 限制条数 默认返回最近十人
 * @returns {Promise<*[]>}
 */
async function fetchLatelyFomoWinner(limit = 3) {
    return new Promise(async resolve => {
        let fomoLength = (await luckydoge.getFomoLength()).toString()
        console.log(fomoLength)
        const winners = []
        if (fomoLength > 0) {
            let start = 0;
            if (fomoLength > limit) start = fomoLength - limit
            for (let i = start; i < fomoLength; i++) {
                let {
                    amount, buyTime, fomoAward, openFomoTime, user, value
                } = await luckydoge.fomoWinnerList(i)
                amount = weiToLuckyDoge(amount);
                buyTime = new Date(buyTime * 1000)
                fomoAward = weiToBnb(fomoAward)
                openFomoTime = moment(openFomoTime * 1000).format('yyyy-MM-dd HH:mm:ss')
                value = weiToUsdt(value)
                winners.push({
                    winner: confoundAddress(user),
                    value,
                    lukydogeAmount: amount,
                    buyTime,
                    fomoAward,
                    openFomoTime
                })
            }
        }
        resolve(winners)
    })
}

async function fetchLatelyLottoWinner(limit = 3) {
    return new Promise(async resolve => {
        let fomoLength = (await luckydoge.getLottoLength()).toString()
        const winners = []
        if (fomoLength > 0) {
            let start = 0;
            if (fomoLength > limit) start = fomoLength - limit
            for (let i = start; i < fomoLength; i++) {
                let {
                    winner, amount, openFomoTime
                } = await luckydoge.lottoWinnerList(i)
                amount = weiToDoge(amount);
                openFomoTime = moment(openFomoTime * 1000).format('yyyy-MM-dd HH:mm:ss')
                winners.push({
                    winner: confoundAddress(winner),
                    amount,
                    settleTime: openFomoTime
                })
            }
        }
        resolve(winners)
    })
}

async function fetchLatelyBuy(callback) {
    let face = luckydoge.interface;
    let nowBlock = await web3Provider.getBlockNumber();
    let logs = await web3Provider.getLogs({
        fromBlock: nowBlock - intervalBlock,
        toBlock: "latest",
        address: luckydoge.address,
        topics: [
            ethers.utils.id("NewBuy(address,uint256,uint256,bool,uint256)")
        ]
    })
    const temp = {}
    logs.forEach(i => {
        temp[i.blockHash] = i;
    })
    logs = Object.keys(temp).map(blockHash => {
        let log = temp[blockHash];
        return face.parseLog(log)
    })
    callback(logs)
}

async function fetchLottoRecord() {
    let winnerLength = (await luckydoge.getLottoLength()).toString()
    const winners = []
    if (winnerLength > 0) {
        if (winnerLength > 10) winnerLength = 10
        for (let i = 0; i < winnerLength; i++) {
            winners.push(await luckydoge.lottoWinnerList(i));
        }
    }
}

function currentFomoPool() {
    return new Promise(resolve => {
        luckydoge.currentFomoPool().then(data => {
            let bnb = weiToBnb(data);
            log(bnb)
            resolve(bnb)
        })
    })
}

function currentLottoPool() {
    return new Promise(resolve => {
        luckydoge.currentLottoPool().then(data => {
            let doge = weiToDoge(data);
            log(doge)
            resolve(doge)
        })
    })
}

function fetchLastBuyUser() {
    return new Promise(resolve => {
        luckydoge.lastFomoBuyUser().then(data => {
            let {amount, buyTime, fomoAward, openFomoTime, user, value} = data;
            if (amount <= 0) return
            amount = weiToLuckyDoge(amount);
            buyTime = moment(buyTime * 1000).format('yyyy-MM-dd HH:mm:ss')
            fomoAward = weiToBnb(fomoAward)
            openFomoTime = moment(openFomoTime * 1000).format('yyyy-MM-dd HH:mm:ss')
            value = weiToUsdt(value)
            // let doge = weiToDoge(data);
            // log(doge)
            resolve({
                user: confoundAddress(user),
                value,
                amount,
                buyTime,
                fomoAward,
                openFomoTime,
            })
        })
    })
}

